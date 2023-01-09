import {h, MaquetteComponent} from 'maquette'
import {EventHandler, RadioButtonOption} from "../types/globals";

export default class RadioButton implements MaquetteComponent {

  constructor(
    private option: RadioButtonOption,
    private groupName: string,
    private checked: boolean,
    private globalInputOptions: Record<string, string|boolean|EventHandler>
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
            disabled: this.option.disabled,
            tabIndex: this.option.disabled ? -1 : 0,
          }
        ),
        h('span', { class: 'phlib__radio-button-label', 'data-cy': this.radioButtonId }),
        this.option.label
      ]
    )
  }
}