import FormConfig from './types/interfaces/FormConfig.interface'
import FormFieldInterface from './types/interfaces/FormField.interface'
import {FormField} from './FormField'
import {VNode, Projector, createProjector} from 'maquette'

export default class SuperForm {
  formConfig: FormConfig;
  fields: FormFieldInterface[]  = []
  VNodes: VNode[] = []
  projector: Projector = createProjector()

  constructor(formConfig: FormConfig) {
    this.formConfig = formConfig;
  }

  init() {
    this.formConfig.fields.forEach((field) => this.fields.push(new FormField(field)))

    this.fields.forEach(field => this.VNodes.push(field.render()))

    this.VNodes.forEach(vnode => {
      this.projector.append(
        document.querySelector(this.formConfig.el) ?? document.body,
        () => vnode
      )
    })
  }
}