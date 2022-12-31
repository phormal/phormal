import {FormField} from '../FormField'
import {h} from 'maquette'
import {MultiSelectOption} from '../types/globals'
import {FormFieldConfig} from '../types/interfaces/FormConfig.interface'
import {Phormal} from "../Phormal";
import InputLabel from "../components/input-label";
import {FIELD_WRAPPER_CLASS} from "../constants/css-selectors";

export class MultiSelect extends FormField {
  options: MultiSelectOption[] = []

  constructor(
    name: string,
    formField: FormFieldConfig,
    form: Phormal
  ) {
    super(name, formField, form)
    this.options = formField.options ? formField.options : []
  }

  render(mountingElement: HTMLElement) {
    const inputLabel = new InputLabel(this).render()

    const options = this.options.map(option => {
      return h('option', { value: option.value }, [option.label])
    })

    this.projector.append(mountingElement, () => {
      return h('div', { id: this.id, class: this.wrapperClasses }, [
        h(
          'select',
          {
            placeholder: this.placeholder,
            value: String(this.getValue()),
            ...this._getGlobalInputProperties(),
          },
          options
        ),
        inputLabel,
      ])
    })
  }
}