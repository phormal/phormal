import {FormField} from '../FormField'
import {h, VNode} from 'maquette'
import {MultiSelectOption} from '../types/globals'
import {FormFieldConfig} from '../types/interfaces/FormConfig.interface'
import {Phormal} from "../Phormal";
import InputLabel from "../components/input-label";

export class MultiSelect extends FormField {
  options: MultiSelectOption[] = []
  optionsElement: HTMLDivElement | null = null
  listItemElements: HTMLLIElement[] = []
  listItemIds: string[] = []

  constructor(
    name: string,
    formField: FormFieldConfig,
    private form: Phormal
  ) {
    super(name, formField, form)
    this.options = formField.options ? formField.options : []
  }

  render(mountingElement: HTMLElement) {
    const elements = this.getSelectElements();
    this.projector.append(mountingElement, () => this.getSelectWrapper(elements))
    this.saveDOMElements();
  }

  private getSelectWrapper(elements: (VNode | null)[]) {
    return h('div', {id: this.id, class: this.wrapperClasses}, elements);
  }

  private getSelectElements() {
    return [
      new InputLabel(this, this.labelId).render(),
      this.getSelectVNode(this.optionsVNodes)
    ];
  }

  get labelId() {
    return `phlib__select-label-${this.name}`
  }

  private getSelectVNode(options: VNode) {
    return h(
      'div',
      { class: 'phlib__select-wrapper' },
      // 1. First, we render a readonly input field, which is used to display the selected option
      // This would be the mock implementation of the select-tag
      [
        h(
          'input',
          {
            placeholder: this.placeholder,
            value: String(this.selectedOptionLabel),
            readOnly: true,
            'aria-labelledby': this.labelId,
            role: 'button',
            onkeydown: event => this.handleOnKeydownForInput(event),
            ...this._getGlobalInputProperties(),
          }
        ),
        // 2. Then, we render a ul-element, which contains the mock-options, rendered through li-tags
        options
      ]
    )
  }

  private handleOnKeydownForInput(event: KeyboardEvent) {
    if (event.code === 'Space' || event.code === 'Enter') {
      this.displayOptions()
    }
  }

  /**
   * Save all DOM elements, that need to be manipulated when opening/closing the options, and when selecting an option
   * */
  private saveDOMElements() {
    this.optionsElement = document.getElementById(this.optionsElementID) as HTMLDivElement
    this.inputDOMElement = document.getElementById(this.inputId) as HTMLInputElement
    this.listItemIds.forEach((id, index) => {
      this.listItemElements.push(document.getElementById(id) as HTMLLIElement)
    })
  }

  get selectedOptionLabel() {
    return this.options.find(option => option.value === this.getValue())?.label || ''
  }

  get optionsVNodes() {
    return h(
      'ul',
      { class: 'phlib__select-options', id: this.optionsElementID, tabIndex: 0, role: 'list', ariaExpanded: false },
      this.options.map((option, index) => {
        const optionId = 'phlib__select-option-' + this.name + '-' + index
        this.listItemIds.push(optionId)

        return h(
          'li',
          {
            onclick: this.selectOption.bind(this),
            onkeydown: this.optionKeyDownHandler.bind(this),
            'data-value': option.value,
            tabIndex: 0,
            id: optionId,
          },
          [option.label])
      })
    )
  }

  /**
   * Is executed, when an option is selected via mouse or keyboard
   * */
  selectOption(event: MouseEvent|KeyboardEvent) {
    const selectedValue = (event.target as HTMLLIElement).dataset.value

    if (selectedValue) {
      this.setValue(selectedValue);
      (this.inputDOMElement as HTMLInputElement).value = this.options.find(option => option.value === selectedValue)?.label || ''
    }

    this.hideOptions()
  }

  /**
   * Is executed, when an option is selected via keyboard
   * */
  optionKeyDownHandler(e: KeyboardEvent) {
    switch (e.code) {
      case 'Enter':
        this.selectOption(e);
        this.hideOptions()
        return;

      case 'ArrowDown':
        this.focusNextListItem(e.code);
        return;

      case 'ArrowUp':
        this.focusNextListItem(e.code);
        return;

      case 'Escape':
        this.hideOptions()
        return;

      default:
        return;
    }
  }

  private focusNextListItem(direction?: string) {
    if (!document.activeElement?.id) return;

    const currentActiveElementIndex = this.listItemIds.indexOf(document.activeElement.id);

    if (direction === 'ArrowDown') {
      this.navigateOnDownArrowKey(currentActiveElementIndex);
    } else if (direction === 'ArrowUp') {
      this.navigateOnUpArrowKey(currentActiveElementIndex);
    }
  }

  private navigateOnUpArrowKey(currentActiveElementIndex: number) {
    const currentActiveElementIsFirstItem = currentActiveElementIndex === 0;

    if (currentActiveElementIsFirstItem) return

    const nextListItemId = this.listItemIds[currentActiveElementIndex - 1];
    const nextItem = document.querySelector(`#${nextListItemId}`);
    if (nextItem instanceof HTMLLIElement) nextItem.focus();
  }

  private navigateOnDownArrowKey(currentActiveElementIndex: number) {
    const currentActiveElementIsLastItem = currentActiveElementIndex >= this.listItemIds.length - 1;

    if (currentActiveElementIsLastItem) return;

    const nextListItemId = this.listItemIds[currentActiveElementIndex + 1];
    const nextItem = document.querySelector(`#${nextListItemId}`);

    if (nextItem instanceof HTMLLIElement) nextItem.focus();
  }

  private focusFirstOption() {
    if (document.activeElement?.id !== this.inputId) return

    const firstListItem = document.getElementById(this.listItemIds[0])
    if (firstListItem) setTimeout(() => firstListItem.focus(), 10)
  }

  get optionsElementID() {
    return 'phlib__select-options-' + this.name
  }

  private displayOptions() {
    if (!(this.optionsElement instanceof HTMLUListElement)) return

    this.optionsElement.style.display = 'block'
    this.optionsElement.ariaExpanded = 'true'
    this.focusFirstOption()
    document.addEventListener('click', this.detectClickOutside.bind(this))
  }

  private detectClickOutside(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement)) return

    const clickedOutsideSelect = !event.target.closest(`#${this.id}`)

    if (clickedOutsideSelect && (this.optionsElement as HTMLDivElement).style.display === 'block') {
      this.hideOptions()
      document.removeEventListener('click', this.detectClickOutside.bind(this))
    }
  }

  private hideOptions() {
    if (!(this.optionsElement instanceof HTMLUListElement)) return

    this.optionsElement.style.display = 'none'
    this.optionsElement.ariaExpanded = 'false'
  }

  _onClick(event: Event) {
    if (!(this.optionsElement instanceof HTMLElement)) return

    this.displayOptions();
    super._onClick(event);
  }
}