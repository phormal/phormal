import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormFieldType} from './types/globals'
import {ConfigFormField} from './types/interfaces/FormConfig.interface'
import {h} from 'maquette'

export class FormField implements FormFieldInterface {
  type: FormFieldType = 'text';
  errors: string[] = []
  value: string = ''
  placeholder: string = ''

  constructor(formField: ConfigFormField) {
    this.placeholder = formField.placeholder ? formField.placeholder : ''

    if (formField.hooks) {
      for (const hook of formField.hooks) {
        if (hook.validateFunctions) {
          Object.assign(this, { ...hook.validateFunctions })
        }
      }
    }
  }

  onClick() {

  }

  onChange() {

  }

  onBlur() {

  }

  onFocus() {

  }

  onInput(event: Event) {
    console.log(event)
  }

  render() {
    return h('div', {}, [
      h(
        'input',
        {
          placeholder: this.placeholder,
          type: this.type,
          value: this.value,
          oninput: this.onInput,
          onblur: this.onBlur,
          onfocus: this.onFocus,
          onclick: this.onClick,
          onchange: this.onChange
        })
    ])
  }
}