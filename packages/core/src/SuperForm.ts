import FormConfig, {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormField} from './FormField'
import {MultiSelect} from './fields/MultiSelect'
import {Checkbox} from './fields/Checkbox'

export class SuperForm {
  readonly _config: FormConfig;
  private readonly _unprocessedFields: Record<string, FormFieldConfig>
  _fields: Record<string, FormFieldInterface>  = {}

  constructor(
    fields: Record<string, FormFieldConfig>,
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
    for (const [fieldName, fieldConfig] of Object.entries(this._unprocessedFields)) {
      // Set the field's value to the default value if it exists
      // The value for each field is stored here in the form object, instead of in each field object. This allows for a sleeker API => form.fieldName instead of form.field.fieldName
      Object.assign(this, {[fieldName]: fieldConfig.value})

      let FormFieldClass = FormField
      if (fieldConfig.type === 'select') FormFieldClass = MultiSelect
      if (fieldConfig.type === 'checkbox') FormFieldClass = Checkbox

      this._fields[fieldName] = new FormFieldClass(
        fieldName,
        fieldConfig,
        this,
      )
    }
    const mountingElement = document.querySelector(this._config.el)

    if (!(mountingElement instanceof HTMLElement)) return

    mountingElement.classList.add(`phlib-${this._config.theme || 'base'}`)

    // 2. Build a two-dimensional array representation of the form, with one nested array per row
    const fieldsInRowRepresentation: string[] = []
    const formRowRepresentation = Object.entries(this._fields).reduce((acc: Array<FormFieldInterface[]>, [fieldName, field]) => {
      if (fieldsInRowRepresentation.includes(fieldName)) return acc

      const row = []
      row.push(field)
      fieldsInRowRepresentation.push(fieldName)

      if (field.row) {
        for (const [additionalFieldName, additionalFieldInRow] of Object.entries(this._fields)) {
          if (additionalFieldInRow.row === row[0].row && !fieldsInRowRepresentation.includes(additionalFieldName)) {
            row.push(additionalFieldInRow)
            fieldsInRowRepresentation.push(additionalFieldName)
          }
        }
      }

      acc.push(row)

      return acc
    }, [])

    // 3. Render all fields
    for (const row of formRowRepresentation) {
      if (row.length === 1) {
        row[0].render(mountingElement)
        continue
      }

      const rowClass = `phlib__row-${row[0].row}`  // All fields in a row have the same row name
      const rowElement = document.createElement('div')
      rowElement.classList.add('phlib__multiple-fields-row', `phlib__row-${rowClass}`)
      mountingElement.appendChild(rowElement)

      for (const field of row) {
        field.render(rowElement)
      }
    }

    // 4. Resolve all dependencies between fields
    for (const [, field] of Object.entries(this._fields)) {
      field.resolveDependencies()
    }

    // 5. Check all value dependencies
    for (const [, field] of Object.entries(this._fields)) {
      field.checkValueDependencies()
    }
  }

  values() {
    const fieldNames = Object.keys(this._fields)
    type returnValueType = Record<string, string|boolean>

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
  _getValue(fieldName: string): string|boolean {
    const val = this[fieldName as keyof SuperForm]
    if (typeof val === 'string' || typeof val === 'boolean') return val

    return ''
  }
}