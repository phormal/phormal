import {h, MaquetteComponent} from 'maquette'
import {EventHandler, RadioButtonOption} from "../types/globals";

export default class RadioButton implements MaquetteComponent {

  constructor(
    private option: RadioButtonOption,
    private groupName: string,
    private checked: boolean = false,
    private globalInputOptions: Record<string, string|boolean|EventHandler> = {}
  ) {}

  render() {
    return h(
      'label',
      { for: this.option.value, class: 'phlib__radio-button' },
      [
        h(
          'input',
          {
            ...this.globalInputOptions,
            value: this.option.value,
            id: this.option.value,
            name: this.groupName,
            checked: this.checked,
            class: 'phlib_radio-hidden',
          }
        ),
        h('span', { class: 'phlib__radio-button-label' }),
        this.option.label
      ]
    )
  }
}