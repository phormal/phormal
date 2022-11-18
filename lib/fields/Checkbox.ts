import {FormField} from '../FormField'
import {FormFieldConfig} from '../types/interfaces/FormConfig.interface'
import SuperForm from '../index'

export class Checkbox extends FormField {
  onInput(event: Event) {
    this.setValue((event.target as HTMLInputElement).checked)

    if (this.form.formConfig.validation !== 'active') return

    this.runAllValidators()
    this.updateErrorMessageInDOM()
  }

  /**
   * Set value field, and update the value in the DOM
   *
   * @param {String} value
   * */
  setValue(value: string|boolean) {
    this.form.setValue(this.name, value)
    const inputElement: HTMLInputElement | null | HTMLElement = document.getElementById(this.inputId)
    if (inputElement instanceof HTMLInputElement) inputElement.checked = Boolean(value)
  }
}