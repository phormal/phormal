import FormFieldInterface from './types/interfaces/FormField.interface'
import {EventHandler, FieldCondition, FormFieldType, GenericFunction} from './types/globals'
import {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import {createProjector, h, Projector} from 'maquette'
import {SuperForm} from './SuperForm'
import ErrorMessage from './components/error-message'
import {FieldHooksResolver} from "./util/field-hooks-resolver";
import {FieldDependencyResolver} from "./util/field-dependency-resolver";
import {FormFieldResolver} from "./util/form-field-resolver";

export class FormField implements FormFieldInterface {
  type: FormFieldType = 'text';
  errors: string[] = []
  label: string = ''
  placeholder: string = ''
  name: string = ''
  disabled: boolean = false
  disabledIf = {}
  hideIf = {}
  projector: Projector = createProjector()
  validators: Record<string, GenericFunction> = {}
  dependencies: string[] = []
  dependants: string[] = []
  config: FormFieldConfig|undefined
  row = ''
  inputDOMElement: HTMLInputElement | null = null
  isHidden = false
  _form: SuperForm;
  _errorMessages = {}
  _onClickHandlers: EventHandler[] = []
  _onChangeHandlers: EventHandler[] = []
  _onBlurHandlers: EventHandler[] = []
  _onFocusHandlers: EventHandler[] = []
  _onInputHandlers: EventHandler[] = []

  constructor(
    name: string,
    formFieldConfig: FormFieldConfig,
    form: SuperForm
  ) {
    this._form = form
    this.name = name
    this.config = formFieldConfig

    new FormFieldResolver(this, formFieldConfig)
    new FieldHooksResolver(this, formFieldConfig.hooks || [])
  }

  resolveDependencies() {
    new FieldDependencyResolver(this)
    const conditions: ReadonlyArray<FieldCondition|undefined> = [
      this.config?.disabledIf,
      this.config?.hideIf,
    ]

    for (const condition of conditions) {
      if (condition) {
        for (const [dep,] of Object.entries(condition)) {
          this._form._fields[dep].addDependant(this.name)
        }
      }
    }
  }

  /**
   * Add a dependant, if it does not already exist
   * */
  addDependant(dependant: string) {
    if (!this.dependants.includes(dependant)) this.dependants.push(dependant)
  }

  get id() { return 'super-form-field-' + this.name }
  get inputId() { return 'super-form-field-input-' + this.name }
  get errorMsgId() { return 'super-form-field-error-' + this.name }
  get inputClass() { return `sflib__input-${this.type}` }

  updateErrorMessageInDOM() {
    const errorsElement: HTMLElement | null = document.getElementById(this.errorMsgId)
    // Remove error message, if the input was corrected
    if (errorsElement instanceof HTMLElement && !this.errors.length) {
      errorsElement.remove()
    }

    if (!this.errors.length) return

    const newErrorMsg = new ErrorMessage(
      this.errorMsgId,
      this.errors,
      this._errorMessages,
      this._form._config.language || 'en'
    ).render()

    // If the error message is already rendered, replace it
    if (errorsElement instanceof HTMLElement) {
      return this.projector.replace(errorsElement, () => newErrorMsg)
    }

    // If the error message is not rendered, render it
    const fieldContainer: HTMLElement | null = document.getElementById(this.id)
    if (fieldContainer instanceof HTMLElement) {
      this.projector.append(fieldContainer, () => newErrorMsg)
    }
  }

  getValue() {
    return this._form._getValue(this.name)
  }

  /**
   * Set value field, and update the value in the DOM
   *
   * @param {String} value
   * */
  setValue(value: string) {
    this._form._setValue(this.name, value)
    const inputElement: HTMLInputElement | null | HTMLElement = document.getElementById(this.inputId)
    if (inputElement instanceof HTMLInputElement) inputElement.value = value
    if (this.dependants.length) this.updateDependants()
  }

  updateDependants() {
    for (const dependant of this.dependants) {
      this._form._fields[dependant].update()
    }
  }

  update() {
    this.checkValueDependencies()

    if (this._form._config.validation !== 'active') return

    this.runAllValidators()
    this.updateErrorMessageInDOM()
  }

  checkValueDependencies() {
    // The following two-dimensional array lists all conditions to be tested for the field
    // Each inner array has two positions: [0] for the condition, [1] for the property to be mutated on this field
    const conditions = [
      [this.disabledIf, 'disabled'],
      [this.hideIf, 'isHidden'],
    ]

    for (const [condition, internalProperty] of conditions) {
      for (let [dep, depValueToTest] of Object.entries(condition)) {
        let actualDepValue = this._form._getValue(dep)
        let result = false

        // 1. Set the new value of the internal property
        if (typeof depValueToTest === 'boolean') {
          result = depValueToTest === this._form._getValue(dep)
        } else if (depValueToTest === 'empty') {
          result = this._form._getValue(dep) === ''
        } else if (depValueToTest === 'not-empty') {
          result = this._form._getValue(dep) !== ''
        } else if (depValueToTest instanceof RegExp && typeof actualDepValue === 'string') {
          actualDepValue = actualDepValue as string
          result = depValueToTest.test(actualDepValue)
        }

        // 2. Update the internal property
        if (internalProperty === 'disabled') {
          this.disabled = result;
          (this.inputDOMElement as HTMLInputElement).disabled = result
        } else if (internalProperty === 'isHidden') {
          this.isHidden = result;
          const fieldContainer: HTMLElement | null = document.getElementById(this.id)
          if (fieldContainer instanceof HTMLElement) {
            fieldContainer.style.display = result ? 'none' : 'block'
          }
        }
      }
    }
  }

  runAllValidators() {
    for (const fn of Object.values(this.validators)) {
      fn(this)
    }
  }

  render(mountingEl: HTMLElement) {
    const inputLabel = this._getInputLabel()
    const inputEl = this.getInputElement()
    let wrapperChildren = [inputLabel, inputEl]
    if (this._form._config.theme === 'material') {
      wrapperChildren = wrapperChildren.reverse()
      // TODO: repair styles for this element
      wrapperChildren.push(h('span', { class: 'sflib__material-bg-focus' }))
    }

    this.projector.append(mountingEl, () => h(
      'div',
      { id: this.id, class: 'sflib__field-wrapper' },
      wrapperChildren
    ))

    this.inputDOMElement = document.getElementById(this.inputId) as HTMLInputElement
  }

  _onClick(event: Event) {
    for (const cb of this._onClickHandlers) cb(event, this)
  }

  _onChange(event: Event) {
    for (const cb of this._onChangeHandlers) cb(event, this)
  }

  _onBlur(event: Event) {
    for (const cb of this._onBlurHandlers) cb(event, this)
  }

  _onFocus(event: Event) {
    for (const cb of this._onFocusHandlers) cb(event, this)
  }

  _onInput(event: Event) {
    this.setValue((event.target as HTMLInputElement).value)
    for (const cb of this._onInputHandlers) cb(event, this)

    if (this._form._config.validation !== 'active') return

    this.runAllValidators()
    this.updateErrorMessageInDOM()
  }

  _getInputLabel() {
    return this.label
      ? h('label', {for: this.inputId, class: 'sflib__field-label'}, [this.label])
      : null;
  }

  _getGlobalInputProperties() {
    return {
      id: this.inputId,
      class: this.inputClass,
      type: this.type,
      disabled: this.disabled,
      oninput: this._onInput.bind(this),
      onblur: this._onBlur.bind(this),
      onfocus: this._onFocus.bind(this),
      onclick: this._onClick.bind(this),
      onchange: this._onChange.bind(this),
    }
  }

  private getInputElement() {
    return h(
      'input',
      {
        placeholder: this._form._config.theme === 'material'
          ? '&nbsp;'
          : this.placeholder,
        value: String(this.getValue()),
        ...this._getGlobalInputProperties(),
      }
    )
  }
}