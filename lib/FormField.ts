import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormFieldType} from './types/globals'
import {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import {createProjector, h, Projector, VNode} from 'maquette'
import uniqid from 'uniqid';
import SuperForm from './index'
import ErrorMessage from './components/error-message'

export class FormField implements FormFieldInterface {
  form: SuperForm;
  type: FormFieldType = 'text';
  errors: string[] = []
  id = 'super-form-field-' + uniqid()
  inputId = 'super-form-field-input-' + uniqid()
  errorMsgId = 'super-form-field-error-' + uniqid()
  label: string = ''
  placeholder: string = ''
  name: string = ''
  projector: Projector = createProjector()
  validators: { [key: string]: any } = {}

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

    if (formField.hooks) {
      for (const hook of formField.hooks) {
        if (hook.validators) {
          Object.assign(this.validators, {...hook.validators})
        }
      }
    }

    this.form.getValue(this.name)
  }

  onClick() {

  }

  onChange(event: Event) {
  }

  onBlur() {

  }

  onFocus() {

  }

  onInput(event: Event) {
    this.setValue((event.target as HTMLInputElement).value)

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
    console.log('updateErrorMessageInDOM')
    // Only update the DOM on input, if the validation type is active
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
    const previousErrorMsg = document.getElementById(this.errorMsgId)
    if (previousErrorMsg instanceof HTMLElement) previousErrorMsg.remove()

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