import {FormField} from '../FormField'
import {h} from 'maquette'
import {MultiSelectOption} from '../types/globals'
import {FormFieldConfig} from '../types/interfaces/FormConfig.interface'
import SuperForm from '../index'

export class MultiSelect extends FormField {
  options: MultiSelectOption[] = []

  constructor(
    name: string,
    formField: FormFieldConfig,
    form: SuperForm
  ) {
    super(name, formField, form)
    this.options = formField.options ? formField.options : []
  }

  render() {
    const inputLabel = this.label ? h('label', {for: this.inputId}, [this.label]) : null;

    const options = this.options.map(option => {
      return h('option', { value: option.value }, [option.label])
    })

    return h('div', {id: this.id}, [
      inputLabel,
      h(
        'select',
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
        },
        options
      ),
    ])
  }
}