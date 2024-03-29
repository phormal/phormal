import {FormField} from '../FormField'
import {h} from 'maquette'
import FormConfig from "../types/interfaces/FormConfig.interface";
import InputLabel from "../components/input-label";

export class Checkbox extends FormField {
  _onInput(event: Event) {
    this.setValue((event.target as HTMLInputElement).checked)

    if ((this._form._config as FormConfig).validation !== 'active') return

    this.runAllValidators()
    this.updateErrorMessageInDOM()
  }

  /**
   * Set value field, and update the value in the DOM
   *
   * @param {String} value
   * */
  setValue(value: string|boolean) {
    this._form._setValue(this.name, Boolean(value))
    const inputElement: HTMLInputElement | null | HTMLElement = document.getElementById(this.inputId)
    if (inputElement instanceof HTMLInputElement) {
      inputElement.checked = Boolean(value)
      inputElement.setAttribute('aria-checked', String(Boolean(value)))
    }
    if (this.dependants.length) this.updateDependants()
  }

  render(mountingEl: HTMLElement) {
    const inputLabel = this.getCheckboxLabel()
    const wrapperProperties = { id: this.id, class: 'phlib__field-wrapper phlib__checkbox-wrapper' }
    this.setValue(this._form._getValue(this.name))

    this.projector.append(mountingEl, () => {
      return h('div', wrapperProperties, [
        h(
          'input',
          {
              checked: Boolean(this.getValue()),
              ariaChecked: Boolean(this.getValue()),
              tabIndex: 0,
              ...this._getGlobalInputProperties(),
          }
        ),
        inputLabel,
      ])
    })
  }

  private getCheckboxLabel() {
    return new InputLabel(
      this,
      undefined,
      ['phlib__checkbox-label']
    ).render()
  }
}
