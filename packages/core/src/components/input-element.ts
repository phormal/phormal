import {h, MaquetteComponent} from "maquette";
import {FormField} from "../FormField";

export default class InputElement implements MaquetteComponent {

  constructor(private formField: FormField) {}

  render() {
    return h(
      'input',
      {
        placeholder: this.formField._form._config.theme === 'material'
          ? '&nbsp;'
          : this.formField.placeholder,
        value: String(this.formField.getValue()),
        ...this.formField._getGlobalInputProperties(),
      }
    )
  }
}