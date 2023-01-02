import {FormField} from '../FormField'
import {h, VNode} from 'maquette'
import {MultiSelectOption} from '../types/globals'
import FormConfig, {FormFieldConfig} from '../types/interfaces/FormConfig.interface'
import {Phormal} from "../Phormal";
import InputLabel from "../components/input-label";

export class MultiSelect extends FormField {
  options: MultiSelectOption[] = []

  constructor(
    name: string,
    formField: FormFieldConfig,
    private form: Phormal
  ) {
    super(name, formField, form)
    this.options = formField.options ? formField.options : []
  }

  getSelectVNode(options: VNode[]) {
    return h(
      'select',
      {
        placeholder: this.placeholder,
        value: String(this.getValue()),
        ...this._getGlobalInputProperties(),
      },
      options
    )
  }

  render(mountingElement: HTMLElement) {
    const inputLabel = new InputLabel(this).render()

    const options = this.options.map(option => {
      return h('option', { value: option.value }, [option.label])
    })

    let elements: (VNode|null)[] = []
    if ((this.form._config as FormConfig).theme === 'basic') elements = [inputLabel, this.getSelectVNode(options)]
    if ((this.form._config as FormConfig).theme === 'material') elements = [this.getSelectVNode(options), inputLabel]

    this.projector.append(mountingElement, () => {
      return h('div', { id: this.id, class: this.wrapperClasses }, elements)
    })
  }
}