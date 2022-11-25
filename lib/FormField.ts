import FormFieldInterface from './types/interfaces/FormField.interface'
import {EventHandler, FormFieldType} from './types/globals'
import {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import {createProjector, h, Projector} from 'maquette'
import SuperForm from './index'
import ErrorMessage from './components/error-message'

export class FormField implements FormFieldInterface {
  form: SuperForm;
  type: FormFieldType = 'text';
  errors: string[] = []
  label: string = ''
  placeholder: string = ''
  name: string = ''
  projector: Projector = createProjector()
  validators: { [key: string]: any } = {}

  onClickHandlers: EventHandler[] = []
  onChangeHandlers: EventHandler[] = []
  onBlurHandlers: EventHandler[] = []
  onFocusHandlers: EventHandler[] = []
  onInputHandlers: EventHandler[] = []

  constructor(
    name: string,
    formField: FormFieldConfig,
    form: SuperForm
  ) {
    this.form = form
    this.placeholder = formField.placeholder ? formField.placeholder : ''
    this.label = formField.label ? formField.label : ''
    this.type = formField.type ? formField.type : 'text'
    this.name = name

    if (formField.handleOnClick) this.onClickHandlers.push(formField.handleOnClick)
    if (formField.handleOnChange) this.onChangeHandlers.push(formField.handleOnChange)
    if (formField.handleOnBlur) this.onBlurHandlers.push(formField.handleOnBlur)
    if (formField.handleOnFocus) this.onFocusHandlers.push(formField.handleOnFocus)
    if (formField.handleOnInput) this.onInputHandlers.push(formField.handleOnInput)

    if (formField.hooks) {
      for (const hook of formField.hooks) {
        if (hook.validators) {
          Object.assign(this.validators, {...hook.validators})
        }
      }
    }

    this.form.getValue(this.name)
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

  onClick(event: Event) {
    for (const cb of this.onClickHandlers) cb(event, this)
  }

  onChange(event: Event) {
    for (const cb of this.onChangeHandlers) cb(event, this)
  }

  onBlur(event: Event) {
    for (const cb of this.onBlurHandlers) cb(event, this)
  }

  onFocus(event: Event) {
    for (const cb of this.onFocusHandlers) cb(event, this)
  }

  onInput(event: Event) {
    this.setValue((event.target as HTMLInputElement).value)
    for (const cb of this.onInputHandlers) cb(event, this)

    if (this.form.formConfig.validation !== 'active') return

    this.runAllValidators()
    this.updateErrorMessageInDOM()
  }

  /**
   * Set value field, and update the value in the DOM
   *
   * @param {String} value
   * */
  setValue(value: string) {
    this.form.setValue(this.name, value)
    const inputElement: HTMLInputElement | null | HTMLElement = document.getElementById(this.inputId)
    if (inputElement instanceof HTMLInputElement) inputElement.value = value
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
    return this.form.getValue(this.name)
  }

  runAllValidators() {
    for (const fn of Object.values(this.validators)) {
      fn.call(this, event)
    }
  }

  render() {
    const inputLabel = this.label ? h('label', {for: this.inputId}, [this.label]) : null;

    return h('div', { id: this.id }, [
      inputLabel,
      h(
        'input',
        {
          id: this.inputId,
          placeholder: this.placeholder,
          type: this.type,
          value: this.getValue(),
          oninput: this.onInput.bind(this),
          onblur: this.onBlur.bind(this),
          onfocus: this.onFocus.bind(this),
          onclick: this.onClick.bind(this),
          onchange: this.onChange.bind(this)
        }
      ),
    ])
  }
}