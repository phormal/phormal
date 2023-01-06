import FormConfig, {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import FormFieldInterface from './types/interfaces/FormField.interface'
import {ConfigResolver} from "./util/config-resolver";
import {FormFieldsResolver} from "./util/form-fields-resolver";
import {FormInitializer} from "./util/form-initializer";

export class Phormal {
  _config: FormConfig|undefined;
  _unprocessedFields: Record<string, FormFieldConfig>
  _fields: Record<string, FormFieldInterface>  = {}

  constructor(
    fields: Record<string, FormFieldConfig>,
    config: FormConfig
  ) {
    new ConfigResolver(config, fields, this)
    this._unprocessedFields = fields;
    this._init()
  }

  private _init() {
    // 1. Initialize all fields, saving them in this._fields[fieldName], and their values in this[fieldName]
    new FormFieldsResolver(this)

    // 2. Build a two-dimensional array representation of the form, with first dimension being rows, and second dimension being fields
    const formRows = FormInitializer.getFormRowRepresentation(this._fields)

    // 3. Render all fields
    const mountingElement = document.querySelector((this._config as FormConfig).el) as HTMLElement

    if (!(mountingElement instanceof HTMLElement)) return

    mountingElement.classList.add('phlib', `phlib-${(this._config as FormConfig).theme || 'basic'}`)

    FormInitializer.renderAllFields(formRows, mountingElement)

    // 4. Resolve all dependencies between fields
    for (const [, field] of Object.entries(this._fields)) {
      field.resolveDependencies()
    }

    // 5. Run all checks for the newly created dependencies
    for (const [, field] of Object.entries(this._fields)) {
      field.checkValueDependencies()
    }
  }

  $values() {
    const fieldNames = Object.keys(this._fields)
    type returnValueType = Record<string, string|boolean>

    return fieldNames.reduce((acc, fieldName) => {
      acc[fieldName] = this._getValue(fieldName)

      return acc
    }, {} as returnValueType)
  }

  $validate() {
    for (const field of Object.values(this._fields)) {
      field.runAllValidators()
      field.updateErrorMessageInDOM()
    }

    // Return true if all fields are valid, false otherwise
    return !Object.entries(this._fields).some(([, field]) => {
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