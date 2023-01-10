import {h, MaquetteComponent} from "maquette";
import {FormField} from "../FormField";
import FormConfig from "../types/interfaces/FormConfig.interface";
import {EventHandler} from "../types/globals";

export default class InputElement implements MaquetteComponent {

  constructor(private formField: FormField) {}

  render() {
    const inputProps: Record<string, string|boolean|EventHandler> = {
      value: String(this.formField.getValue()),
      ...this.formField._getGlobalInputProperties(),
    }

    if ((this.formField._form._config as FormConfig).theme === 'material') inputProps.placeholder = '&nbsp;'
    else if (this.formField.placeholder) inputProps.placeholder = this.formField.placeholder

    return h(
      'input',
      inputProps
    )
  }
}