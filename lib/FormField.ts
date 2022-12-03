import FormFieldInterface from './types/interfaces/FormField.interface'
import {EventHandler, FormFieldType} from './types/globals'
import {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import {createProjector, h, Projector} from 'maquette'
import {SuperForm} from './SuperForm'
import ErrorMessage from './components/error-message'

export class FormField implements FormFieldInterface {
  type: FormFieldType = 'text';
  errors: string[] = []
  label: string = ''
  placeholder: string = ''
  name: string = ''
  disabled: boolean = false
  projector: Projector = createProjector()
  validators: { [key: string]: any } = {}
  _form: SuperForm;

  _onClickHandlers: EventHandler[] = []
  _onChangeHandlers: EventHandler[] = []
  _onBlurHandlers: EventHandler[] = []
  _onFocusHandlers: EventHandler[] = []
  _onInputHandlers: EventHandler[] = []

  constructor(
    name: string,
    formField: FormFieldConfig,
    form: SuperForm
  ) {
    this._form = form
    this.placeholder = formField.placeholder ? formField.placeholder : ''
    this.label = formField.label ? formField.label : ''
    this.type = formField.type ? formField.type : 'text'
    this.name = name
    this.disabled = formField.disabled ? formField.disabled : false

    if (formField.handleOnClick) this._onClickHandlers.push(formField.handleOnClick)
    if (formField.handleOnChange) this._onChangeHandlers.push(formField.handleOnChange)
    if (formField.handleOnBlur) this._onBlurHandlers.push(formField.handleOnBlur)
    if (formField.handleOnFocus) this._onFocusHandlers.push(formField.handleOnFocus)
    if (formField.handleOnInput) this._onInputHandlers.push(formField.handleOnInput)

    if (formField.hooks) {
      for (const hook of formField.hooks) {
        if (hook.validators) {
          Object.assign(this.validators, {...hook.validators})
        }

        if (typeof hook.handleOnInput === 'function') this._onInputHandlers.push(hook.handleOnInput)
      }
    }

    this._form.getValue(this.name)
  }

  get id() {
    return 'super-form-field-' + this.name
  }

  get inputId() {
    return 'super-form-field-input-' + this.name
  }

  get errorMsgId() {
    return 'super-form-field-error-' + this.name
  }

  get inputClass() {
    return `sflib__input-${this.type}`
  }

  updateErrorMessageInDOM() {
    const errorsElement: HTMLElement | null = document.getElementById(this.errorMsgId)
    // Remove error message, if the input was corrected
    if (errorsElement instanceof HTMLElement && !this.errors.length) {
      errorsElement.remove()
    }

    if (!this.errors.length) return

    const newErrorMsg = new ErrorMessage(this.errorMsgId, this.errors).render()

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
    return this._form.getValue(this.name)
  }

  /**
   * Set value field, and update the value in the DOM
   *
   * @param {String} value
   * */
  setValue(value: string) {
    this._form.setValue(this.name, value)
    const inputElement: HTMLInputElement | null | HTMLElement = document.getElementById(this.inputId)
    if (inputElement instanceof HTMLInputElement) inputElement.value = value
  }

  runAllValidators() {
    for (const fn of Object.values(this.validators)) {
      fn(this)
    }
  }

  render(mountingEl: HTMLElement) {
    const inputLabel = this._getInputLabel()
    const inputEl = this.getInputElement()

    this.projector.append(mountingEl, () => h(
      'div',
      {id: this.id, class: 'sflib__field-wrapper'},
      [
        inputLabel,
        inputEl,
      ]
    ))
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

    if (this._form.formConfig.validation !== 'active') return

    this.runAllValidators()
    this.updateErrorMessageInDOM()
  }

  _getInputLabel() {
    return this.label
      ? h('label', {for: this.inputId, class: 'sflib__field-label'}, [this.label])
      : null;
  }

  /***/
  _getGlobalInputProperties() {
    return {
      id: this.inputId,
      class: this.inputClass,
      type: this.type,
      oninput: this._onInput.bind(this),
      onblur: this._onBlur.bind(this),
      onfocus: this._onFocus.bind(this),
      onclick: this._onClick.bind(this),
      onchange: this._onChange.bind(this)
    }
  }

  private getInputElement() {
    return h(
      'input',
      {
        placeholder: this.placeholder,
        value: this.getValue(),
        ...this._getGlobalInputProperties(),
      }
    )
  }
}