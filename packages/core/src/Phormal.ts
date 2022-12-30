import FormConfig, {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import FormFieldInterface from './types/interfaces/FormField.interface'
import {ConfigResolver} from "./util/config-resolver";
import {FormFieldsFactory} from "./util/form-fields-factory";
import {ConfigError} from "./errors/config-error";

export class Phormal {
  _config: FormConfig|undefined;
  _unprocessedFields: Record<string, FormFieldConfig>
  _fields: Record<string, FormFieldInterface>  = {}

  constructor(
    fields: Record<string, FormFieldConfig>,
    config: FormConfig
  ) {
    new ConfigResolver(config, this)
    Object.entries(fields).forEach(field => {
      const [fieldName,] = field
      const forbiddenFieldNames = ['init', 'values', 'validate', '_setValue', '_getValue', '_config', '_unprocessedFields', '_fields']
      if (forbiddenFieldNames.includes(fieldName))
        throw new ConfigError(
          'The following words are reserved by the library, and cannot be used as field names: '
          + forbiddenFieldNames.join(', ')
        )
    })
    this._unprocessedFields = fields;
  }

  init() {
    // 1. Initialize all fields, saving them in this._fields[fieldName], and their values in this[fieldName]
    new FormFieldsFactory(this)

    // 2. Build a two-dimensional array representation of the form, with one nested array per row
    const fieldsInRowRepresentation: string[] = []
    const formRowRepresentation = Object.entries(this._fields).reduce((acc: Array<FormFieldInterface[]>, [fieldName, field]) => {
      if (fieldsInRowRepresentation.includes(fieldName)) return acc

      const row = []
      row.push(field)
      fieldsInRowRepresentation.push(fieldName)

      if (field.row) {
        // Collect all fields with the same "row" value, in one row
        for (const [additionalFieldName, additionalField] of Object.entries(this._fields)) {
          if (additionalField.row === row[0].row && !fieldsInRowRepresentation.includes(additionalFieldName)) {
            row.push(additionalField)
            fieldsInRowRepresentation.push(additionalFieldName)
          }
        }
      }

      acc.push(row)

      return acc
    }, [])

    // 3. Render all fields
    const mountingElement = document.querySelector((this._config as FormConfig).el)

    if (!(mountingElement instanceof HTMLElement)) return

    mountingElement.classList.add(`phlib-${(this._config as FormConfig).theme || 'basic'}`)

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

    // 5. Run all checks for the newly created dependencies
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

    // Return true if all fields are valid, false otherwise
    return !Object.entries(this._fields).some(([fieldName, field]) => {
      return !!field.errors?.length;
    })
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
    const val = this[fieldName as keyof Phormal]
    if (typeof val === 'string' || typeof val === 'boolean') return val

    return ''
  }
}