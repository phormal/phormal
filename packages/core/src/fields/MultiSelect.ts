import {FormField} from '../FormField'
import {h, VNode} from 'maquette'
import {MultiSelectOption} from '../types/globals'
import {FormFieldConfig} from '../types/interfaces/FormConfig.interface'
import {Phormal} from "../Phormal";
import InputLabel from "../components/input-label";

export class MultiSelect extends FormField {
  options: MultiSelectOption[] = []
  optionsElement: HTMLDivElement | null = null

  constructor(
    name: string,
    formField: FormFieldConfig,
    private form: Phormal
  ) {
    super(name, formField, form)
    this.options = formField.options ? formField.options : []
  }

  render(mountingElement: HTMLElement) {
    const inputLabel = new InputLabel(this).render()

    const elements: (VNode|null)[] = [inputLabel, this.getSelectVNode(this.optionsVNodes)]

    this.projector.append(mountingElement, () => {
      return h('div', { id: this.id, class: this.wrapperClasses }, elements)
    })

    this.saveDOMElements();
  }

  private saveDOMElements() {
    this.optionsElement = document.getElementById(this.optionsElementID) as HTMLDivElement
    this.inputDOMElement = document.getElementById(this.inputId) as HTMLInputElement
  }

  getSelectVNode(options: VNode) {
    return h(
      'div',
      { class: 'phlib__select-wrapper' },
      [
        h(
          'input',
          {
            placeholder: this.placeholder,
            value: String(this.selectedOptionLabel),
            readOnly: true,
            ...this._getGlobalInputProperties(),
          }
        ),
        options
      ]
    )
  }

  get selectedOptionLabel() {
    return this.options.find(option => option.value === this.getValue())?.label || ''
  }

  get optionsVNodes() {
    return h(
      'ul',
      { class: 'phlib__select-options', id: this.optionsElementID },
      this.options.map(option => {
        return h(
          'li',
          { onclick: this.optionClickHandler.bind(this), 'data-value': option.value },
          [option.label])
      })
    )
  }

  /**
   * Is executed, when an option is clicked
   * */
  optionClickHandler(event: MouseEvent) {
    const target = event.target as HTMLElement
    const selectedValue = target.dataset.value
    if (selectedValue) {
      this.setValue(selectedValue);
      (this.inputDOMElement as HTMLInputElement).value = this.options.find(option => option.value === selectedValue)?.label || ''
    }
    this.hideOptions()
  }

  get optionsElementID() {
    return 'phlib__select-options-' + this.name
  }

  private displayOptions() {
    (this.optionsElement as HTMLDivElement).style.display = 'block'
  }

  private hideOptions() {
    (this.optionsElement as HTMLDivElement).style.display = 'none'
  }

  _onClick(event: Event) {
    if (!(this.optionsElement instanceof HTMLElement)) return

    if (this.optionsElement.style.display === 'block') this.hideOptions()
    else this.displayOptions();

    super._onClick(event);
  }
}