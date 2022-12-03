import FormConfig, {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormField} from './FormField'
import {MultiSelect} from './fields/MultiSelect'
import {Checkbox} from './fields/Checkbox'

export class SuperForm {
  _config: FormConfig;
  private readonly _unprocessedFields: { [key: string]: FormFieldConfig }
  private _fields: { [key: string]: FormFieldInterface }  = {}

  constructor(
    fields: { [key: string]: FormFieldConfig },
    formConfig: FormConfig
  ) {
    // Set the required defaults of the form config
    this._config = {
      ...formConfig,
      validation: formConfig.validation || 'active',
      language: formConfig.language || 'en',
    };
    this._unprocessedFields = fields;
  }

  init() {
    // 1. Initialize all fields
    for (const [fieldName, field] of Object.entries(this._unprocessedFields)) {
      // Set the field's value to the default value if it exists
      Object.assign(this, {[fieldName]: field.value})

      let FormFieldClass = FormField
      if (field.type === 'select') FormFieldClass = MultiSelect
      if (field.type === 'checkbox') FormFieldClass = Checkbox

      this._fields[fieldName] = new FormFieldClass(
        fieldName,
        field,
        this,
      )
    }
    const mountingElement = document.querySelector(this._config.el)

    if (!(mountingElement instanceof HTMLElement)) return

    mountingElement.classList.add(`sflib-${this._config.theme || 'base'}`)

    // 2. Create VNodes for all the fields
    for (const [, field] of Object.entries(this._fields)) {
      field.render(mountingElement)
    }
  }

  values() {
    const fieldNames = Object.keys(this._fields)
    type returnValueType = { [key: string]: string|boolean }

    return fieldNames.reduce((acc, fieldName) => {
      acc[fieldName] = this._getValue(fieldName)

      return acc
    }, {} as returnValueType)
  }

  validate() {
    for (const field of Object.values(this._fields)) {
      field.runAllValidators()
      field.updateErrorMessageInDOM()
    }
  }

  /**
   * Internal API
   * */
  _setValue(fieldName: string, value: string|boolean) {
    Object.assign(this, {[fieldName]: value})
  }

  /**
   * Internal API
   * */
  _getValue(fieldName: string): string {
    const val = this[fieldName as keyof SuperForm]
    if (typeof val === 'string' || typeof val === 'boolean') return val

    return ''
  }
}