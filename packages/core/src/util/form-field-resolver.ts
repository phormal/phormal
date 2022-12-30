import {FormField} from "../FormField";
import {FormFieldConfig} from "../types/interfaces/FormConfig.interface";
import {FormFieldError} from "../errors/form-field-error";
import {FormFieldTypes} from "../types/globals";

/**
 * A utility class for resolving the properties of a FormField
 * */
export class FormFieldResolver {
  constructor(
    private field: FormField,
    private formFieldConfig: FormFieldConfig
  ) {
    this.validateFieldConfig()
    this.resolveField()
  }
  
  validateFieldConfig() {
    if (![...FormFieldTypes, undefined].includes(this.formFieldConfig.type)) {
      throw new FormFieldError(
        'Invalid field type. The following are allowed: ' + FormFieldTypes.join(', ')
      )
    }
  }
  
  resolveField() {
    this.field.placeholder = this.formFieldConfig.placeholder ? this.formFieldConfig.placeholder : ''
    this.field.label = this.formFieldConfig.label ? this.formFieldConfig.label : ''
    this.field.type = this.formFieldConfig.type ? this.formFieldConfig.type : 'text'
    this.field.disabled = this.formFieldConfig.disabled ? this.formFieldConfig.disabled : false
    this.field.disabledIf = this.formFieldConfig.disabledIf ? this.formFieldConfig.disabledIf : {}
    this.field.hideIf = this.formFieldConfig.hideIf ? this.formFieldConfig.hideIf : {}
    this.field.dependencies = this.formFieldConfig.dependencies ? this.formFieldConfig.dependencies : []
    this.field.row = this.formFieldConfig.row ? this.formFieldConfig.row : ''

    if (this.formFieldConfig.handleOnClick) this.field._onClickHandlers.push(this.formFieldConfig.handleOnClick)
    if (this.formFieldConfig.handleOnChange) this.field._onChangeHandlers.push(this.formFieldConfig.handleOnChange)
    if (this.formFieldConfig.handleOnBlur) this.field._onBlurHandlers.push(this.formFieldConfig.handleOnBlur)
    if (this.formFieldConfig.handleOnFocus) this.field._onFocusHandlers.push(this.formFieldConfig.handleOnFocus)
    if (this.formFieldConfig.handleOnInput) this.field._onInputHandlers.push(this.formFieldConfig.handleOnInput)
  }
}