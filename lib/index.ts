import FormConfig from './types/interfaces/FormConfig.interface'
import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormField} from './FormField'
import {VNode, Projector, createProjector} from 'maquette'

export default class SuperForm {
  formConfig: FormConfig;
  fields: { [key: string]: FormFieldInterface }  = {}
  VNodes: VNode[] = []
  projector: Projector = createProjector()

  constructor(formConfig: FormConfig) {
    this.formConfig = formConfig;
  }

  init() {
    for (const [fieldName, field] of Object.entries(this.formConfig.fields)) {
      this.fields[fieldName] = new FormField(fieldName, field)
    }

    for (const [, field] of Object.entries(this.fields)) {
      this.VNodes.push(field.render())
    }

    const mountingElement = document.querySelector(this.formConfig.el)

    if (!(mountingElement instanceof Element)) return

    this.VNodes.forEach(vnode => {
      this.projector.append(
         mountingElement,
        () => vnode
      )
    })
  }

  values() {
    return Object.entries(this.fields).reduce((acc, [fieldName, field]) => {
      if (typeof field.value === 'string') acc[fieldName] = field.value

      return acc
    }, {} as { [key: string]: string })
  }

  validate() {
    for (const field of Object.values(this.fields)) {
      field.runAllValidators()
      field.rerender()
    }
  }
}