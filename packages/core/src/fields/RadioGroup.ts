import {h} from 'maquette'
import {FormField} from "../FormField";
import {RadioButtonOption} from "../types/globals";
import {RadioGroupConfig} from "../types/interfaces/FormConfig.interface";
import {Phormal} from "../Phormal";
import {FIELD_WRAPPER_CLASS} from "../constants/css-selectors";
import RadioButton from "../components/radio-button";
import RadioGroupInterface from "../types/interfaces/RadioGroup.interface";

export class RadioGroup extends FormField implements RadioGroupInterface {
  options: RadioButtonOption[] = []

  constructor(
    name: string,
    formField: RadioGroupConfig,
    form: Phormal
  ) {
    super(name, formField, form)
    this.options = formField.options
  }

  get globalInputProperties() {
    return {
      ...this._getGlobalInputProperties(),
      type: 'radio',
    }
  }

  public reset() {
    this.setValue(this.initialValue)
    this.rerender()
  }

  render(mountingElement: HTMLElement) {
    this.projector.append(mountingElement, () => this.getFullRadioGroupVNode())
  }

  rerender() {
    const radioGroupWrapper = document.getElementById(this.id) as HTMLElement
    this.projector.replace(radioGroupWrapper, () => this.getFullRadioGroupVNode())
  }

  getFullRadioGroupVNode() {
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
      { class: FIELD_WRAPPER_CLASS + ' phlib__radio-buttons' },
      options
    )

    const label = h('label', { class: 'phlib__radio-group-label' }, [this.label])

    return h(
      'div',
      { class: 'phlib__radio-group', id: this.id },
      this.label ? [label, radioButtons] : [radioButtons]
    )
  }
}
