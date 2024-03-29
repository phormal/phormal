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
    if (this._config?.autoInit) this._init()
  }

  _init() {
    // 1. Initialize all fields, saving them in this._fields[fieldName], and their values in this[fieldName]
    new FormFieldsResolver(this)

    // 2. Build a two-dimensional array representation of the form, with first dimension being rows, and second dimension being fields
    const formRows = FormInitializer.getFormRowRepresentation(this._fields)

    // 3. Render all fields
    const mountingElement = document.querySelector((this._config as FormConfig).el) as HTMLElement

    if (!(mountingElement instanceof HTMLElement)) return

    mountingElement.classList.add('phlib', `phlib-${(this._config as FormConfig).theme}`)

    FormInitializer.renderAllFields(formRows, mountingElement)

    // 4. Resolve all dependencies between fields
    Object.values(this._fields).forEach(field => field.resolveDependencies())

    // 5. Run all checks for the newly created dependencies
    Object.values(this._fields).forEach(field => field.checkValueDependencies())
  }

  /**
   * Deletes all Markup inserted by the Phormal instance
   * */
  $destroy() {
    Object.values(this._fields).forEach(field => field.destroy())
  }

  /**
   * Returns an object literal, with key-value pairs of all fields and their values
   * */
  $values() {
    const fieldNames = Object.keys(this._fields)
    type returnValueType = Record<string, string|boolean>

    return fieldNames.reduce((acc, fieldName) => {
      acc[fieldName] = this._getValue(fieldName)

      return acc
    }, {} as returnValueType)
  }

  /**
   * Runs all validator functions for all fields.
   * Returns true if all fields have valid input, false otherwise.
   * */
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
   * Resets all or a subset of fields to their initial values.
   * With no arguments passed, this resets all fields.
   * For all fields passed as arguments, specified by their names, this resets only those fields.
   * */
  $reset(...args: string[]) {
    if (!args.length) return Object.values(this._fields).forEach(field => field.reset())

    for (const fieldName of args) {
      if (this._fields[fieldName]) this._fields[fieldName].reset()
    }
  }

  /**
   * Return an object with key-value pairs of all fields and their errors,
   * the key being the name of the field, and the value being an array or errors.
   */
  get $errors() {
    return Object.values(this._fields).reduce((acc, field) => {
      acc[field.name] = field.errors

      return acc
    }, {} as Record<string, string[]>)
  }

  /**
   * Possesses the value true if the form has changed since being initialized, false otherwise
   * */
  get $isDirty() {
    return Object.values(this._fields).some(field => field.isDirty)
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
