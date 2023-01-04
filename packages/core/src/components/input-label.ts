import {h, MaquetteComponent} from "maquette";
import {FormField} from "../FormField";

export default class InputLabel implements MaquetteComponent {

  constructor(
    private formField: FormField,
    private labelId?: string
  ) {}

  render() {
    return this.formField.label
      ? h(
        'label',
        {
          for: this.formField.inputId,
          class: 'phlib__field-label',
          id: this.labelId,
        },
        [this.formField.label]
      )
      : null;
  }
}