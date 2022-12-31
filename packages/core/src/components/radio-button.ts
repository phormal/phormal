import {h, MaquetteComponent} from 'maquette'
import {EventHandler, RadioButtonOption} from "../types/globals";

export default class RadioButton implements MaquetteComponent {

  constructor(
    private option: RadioButtonOption,
    private groupName: string,
    private checked: boolean = false,
    private globalInputOptions: Record<string, string|boolean|EventHandler> = {}
  ) {}

  get radioButtonId() {
    return `phlib__radio-button--${this.option.value}`
  }

  render() {
    return h(
      'label',
      { for: this.radioButtonId, class: 'phlib__radio-button' },
      [
        h(
          'input',
          {
            ...this.globalInputOptions,
            value: this.option.value,
            id: this.radioButtonId,
            name: this.groupName,
            checked: this.checked,
            class: 'phlib_radio-hidden',
          }
        ),
        h('span', { class: 'phlib__radio-button-label', 'data-cy': this.radioButtonId }),
        this.option.label
      ]
    )
  }
}