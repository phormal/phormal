import {h, MaquetteComponent} from "maquette";
import {FormField} from "../FormField";

export default class InputLabel implements MaquetteComponent {

  constructor(
    private formField: FormField,
    private labelId?: string,
    private classList?: string[]
  ) {}

  render() {
    return this.formField.label
      ? h(
        'label',
        {
          for: this.formField.inputId,
          class: this.classList ? this.classList.join(' ') : 'phlib__field-label',
          id: this.labelId,
        },
        [this.labelText]
      )
      : null;
  }

  get labelText() {
    if (typeof this.formField.label === 'object') {
      const configLanguage = this.formField!._form._config?.language as string

      return this.formField.label[configLanguage]
        ? this.formField.label[configLanguage]
        : this.formField.label[this.formField._form._config?.fallbackLanguage as string]
    }

    return this.formField.label
  }
}
