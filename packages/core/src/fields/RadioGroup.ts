import {h} from 'maquette'
import {FormField} from "../FormField";
import {RadioButtonOption} from "../types/globals";
import {FormFieldConfig} from "../types/interfaces/FormConfig.interface";
import {Phormal} from "../Phormal";
import {FIELD_WRAPPER_CLASS} from "../constants/css-selectors";
import RadioButton from "../components/radio-button";

export class RadioGroup extends FormField {
  options: RadioButtonOption[] = []

  constructor(
    name: string,
    formField: FormFieldConfig,
    form: Phormal
  ) {
    super(name, formField, form)
    this.options = formField.options ? formField.options : []
  }

  get globalInputProperties() {
    return {
      ...this._getGlobalInputProperties(),
      type: 'radio',
    }
  }

  render(mountingElement: HTMLElement) {
    const options = this.options.map(option => {
      return new RadioButton(
        option,
        this.name,
        this.getValue() === option.value,
        this.globalInputProperties
      ).render()
    })

    const radioButtons = h(
      'div',
      { id: this.id, class: FIELD_WRAPPER_CLASS + ' phlib__radio-buttons' },
      options
    )

    this.projector.append(mountingElement, () => {
      return this.label
        ? h('div', { class: 'phlib__radio-group' }, [
          h('label', { class: 'phlib__radio-group-label' }, [this.label]),
          radioButtons,
        ])
        : radioButtons
    })
  }
}