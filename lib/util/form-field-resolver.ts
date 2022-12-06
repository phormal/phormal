import {FormField} from "../FormField";
import {FormFieldConfig} from "../types/interfaces/FormConfig.interface";

export class FormFieldResolver {
  constructor(field: FormField, formFieldConfig: FormFieldConfig) {
    field.placeholder = formFieldConfig.placeholder ? formFieldConfig.placeholder : ''
    field.label = formFieldConfig.label ? formFieldConfig.label : ''
    field.type = formFieldConfig.type ? formFieldConfig.type : 'text'
    field.disabled = formFieldConfig.disabled ? formFieldConfig.disabled : false
    field.disabledIf = formFieldConfig.disabledIf ? formFieldConfig.disabledIf : {}
    field.hideIf = formFieldConfig.hideIf ? formFieldConfig.hideIf : {}
    field.dependencies = formFieldConfig.dependencies ? formFieldConfig.dependencies : []

    if (formFieldConfig.handleOnClick) field._onClickHandlers.push(formFieldConfig.handleOnClick)
    if (formFieldConfig.handleOnChange) field._onChangeHandlers.push(formFieldConfig.handleOnChange)
    if (formFieldConfig.handleOnBlur) field._onBlurHandlers.push(formFieldConfig.handleOnBlur)
    if (formFieldConfig.handleOnFocus) field._onFocusHandlers.push(formFieldConfig.handleOnFocus)
    if (formFieldConfig.handleOnInput) field._onInputHandlers.push(formFieldConfig.handleOnInput)
  }
}