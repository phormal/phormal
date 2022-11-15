import FormConfig, {FormFieldConfig} from './types/interfaces/FormConfig.interface'
import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormField} from './FormField'
import {VNode, Projector, createProjector} from 'maquette'
import {ValidationType} from './types/globals'

export default class SuperForm {
  formConfig: FormConfig;
  unprocessedFields: { [key: string]: FormFieldConfig }
  fields: { [key: string]: FormFieldInterface }  = {}
  VNodes: VNode[] = []
  projector: Projector = createProjector()

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

      this.fields[fieldName] = new FormField(
        fieldName,
        field,
        this,
      )
    }

    // 2. Create VNodes for all the fields
    for (const [, field] of Object.entries(this.fields)) {
      this.VNodes.push(field.render())
    }

    const mountingElement = document.querySelector(this.formConfig.el)

    if (!(mountingElement instanceof Element)) return

    // 3. Render the form
    this.VNodes.forEach(vnode => {
      this.projector.append(
         mountingElement,
        () => vnode
      )
    })
  }

  values() {
    const fieldNames = Object.keys(this.fields)
    type returnValueType = { [key: string]: string }

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

  setValue(fieldName: string, value: string) {
    Object.assign(this, {[fieldName]: value})
  }

  getValue(fieldName: string): string {
    const val = this[fieldName as keyof SuperForm]
    if (typeof val === 'string') return val

    return ''
  }
}