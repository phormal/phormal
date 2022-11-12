import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormFieldType} from './types/globals'
import {ConfigFormField} from './types/interfaces/FormConfig.interface'
import {createProjector, h, Projector, VNode} from 'maquette'
import uniqid from 'uniqid';

export class FormField implements FormFieldInterface {
  type: FormFieldType = 'text';
  errors: string[] = []
  id = 'super-form-field-' + uniqid()
  inputId = 'super-form-field-input-' + uniqid()
  value: string = ''
  label: string = ''
  placeholder: string = ''
  name: string = ''
  projector: Projector = createProjector()
  validators: { [key: string]: any } = {}

  constructor(
    name: string,
    formField: ConfigFormField
  ) {
    Object.assign(this, {[name]: () => this.value})
    this.placeholder = formField.placeholder ? formField.placeholder : ''
    this.value = formField.value ? formField.value : ''
    this.label = formField.label ? formField.label : ''
    this.type = formField.type ? formField.type : 'text'
    this.name = name

    if (formField.hooks) {
      for (const hook of formField.hooks) {
        if (hook.validators) {
          Object.assign(this.validators, {...hook.validators})
        }
      }

      console.log(this.name)
      console.log(this.validators)
    }
  }

  onClick() {

  }

  onChange(event: Event) {
  }

  onBlur() {

  }

  onFocus() {

  }

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value
    this.runAllValidators()
  }

  /**
   * Set value field, and update the value in the DOM
   *
   * @param {String} value
   * */
  setValue(value: string) {
    this.value = value
    const thisElement: HTMLInputElement | null | HTMLElement = document.getElementById(this.inputId)

    if (thisElement instanceof HTMLInputElement) thisElement.value = value
  }

  runAllValidators() {
    for (const fn of Object.values(this.validators)) {
      fn.call(this, event)
    }
  }

  render() {
    const inputLabel = this.label ? h('label', {for: this.inputId}, [this.label]) : null;
    const inputErrorMsg = this.errors.length
      ? h('div', {}, ['Error! ' + this.errors.join(', ')])
      : null

    return h('div', {id: this.id}, [
      inputLabel,
      h(
        'input',
        {
          id: this.inputId,
          placeholder: this.placeholder,
          type: this.type,
          value: this.value,
          oninput: this.onInput.bind(this),
          onblur: this.onBlur.bind(this),
          onfocus: this.onFocus.bind(this),
          onclick: this.onClick.bind(this),
          onchange: this.onChange.bind(this)
        }
      ),
      inputErrorMsg,
    ])
  }

  rerender() {
    const thisElement = document.getElementById(this.id)
    if (!thisElement) return

    this.projector.replace(thisElement, () => this.render())
  }
}