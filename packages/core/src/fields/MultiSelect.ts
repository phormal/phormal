import {FormField} from '../FormField'
import {h} from 'maquette'
import {MultiSelectOption} from '../types/globals'
import {FormFieldConfig} from '../types/interfaces/FormConfig.interface'
import {SuperForm} from "../SuperForm";

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

  render(mountingElement: HTMLElement) {
    const inputLabel = this._getInputLabel()

    const options = this.options.map(option => {
      return h('option', { value: option.value }, [option.label])
    })

    this.projector.append(mountingElement, () => {
      return h('div', {id: this.id, class: 'phlib__field-wrapper'}, [
        inputLabel,
        h(
            'select',
            {
                placeholder: this.placeholder,
                value: String(this.getValue()),
                ...this._getGlobalInputProperties(),
            },
            options
        ),
      ])
    })
  }
}