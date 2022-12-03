import FormConfig, {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormField} from './FormField'
import {MultiSelect} from './fields/MultiSelect'
import {Checkbox} from './fields/Checkbox'

export class SuperForm {
  formConfig: FormConfig;
  unprocessedFields: { [key: string]: FormFieldConfig }
  fields: { [key: string]: FormFieldInterface }  = {}

  constructor(
    fields: { [key: string]: FormFieldConfig },
    formConfig: FormConfig
  ) {
    // Set the required defaults of the form config
    this.formConfig = {
      ...formConfig,
      validation: formConfig.validation || 'active',
    };
    this.unprocessedFields = fields;
  }

  init() {
    // 1. Initialize all fields
    for (const [fieldName, field] of Object.entries(this.unprocessedFields)) {
      // Set the field's value to the default value if it exists
      Object.assign(this, {[fieldName]: field.value})

      let FormFieldClass = FormField
      if (field.type === 'select') FormFieldClass = MultiSelect
      if (field.type === 'checkbox') FormFieldClass = Checkbox

      this.fields[fieldName] = new FormFieldClass(
        fieldName,
        field,
        this,
      )
    }
    const mountingElement = document.querySelector(this.formConfig.el)

    if (!(mountingElement instanceof HTMLElement)) return

    mountingElement.classList.add(`sflib-${this.formConfig.theme || 'base'}`)

    // 2. Create VNodes for all the fields
    for (const [, field] of Object.entries(this.fields)) {
      field.render(mountingElement)
    }
  }

  values() {
    const fieldNames = Object.keys(this.fields)
    type returnValueType = { [key: string]: string|boolean }

    return fieldNames.reduce((acc, fieldName) => {
      acc[fieldName] = this.getValue(fieldName)

      return acc
    }, {} as returnValueType)
  }

  validate() {
    for (const field of Object.values(this.fields)) {
      field.runAllValidators()
      field.updateErrorMessageInDOM()
    }
  }

  setValue(fieldName: string, value: string|boolean) {
    Object.assign(this, {[fieldName]: value})
  }

  getValue(fieldName: string): string {
    const val = this[fieldName as keyof SuperForm]
    if (typeof val === 'string' || typeof val === 'boolean') return val

    return ''
  }
}