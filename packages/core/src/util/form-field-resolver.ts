import {FormFieldConfig} from "../types/interfaces/FormConfig.interface";
import {FormFieldError} from "../errors/form-field-error";
import {FormFieldTypes} from "../types/globals";
import FormFieldInterface from "../types/interfaces/FormField.interface";

/**
 * A utility class for resolving the properties of a FormField
 * */
export class FormFieldResolver {
  constructor(
    private field: FormFieldInterface,
    private formFieldConfig: FormFieldConfig
  ) {
    this.validateFieldConfig()
    this.resolveField()
    if (formFieldConfig.focus) this.focusOnMount()
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
    this.field.row = this.formFieldConfig.row ? this.formFieldConfig.row : ''

    if (this.formFieldConfig.handleOnClick) this.field._onClickHandlers.push(this.formFieldConfig.handleOnClick)
    if (this.formFieldConfig.handleOnChange) this.field._onChangeHandlers.push(this.formFieldConfig.handleOnChange)
    if (this.formFieldConfig.handleOnBlur) this.field._onBlurHandlers.push(this.formFieldConfig.handleOnBlur)
    if (this.formFieldConfig.handleOnFocus) this.field._onFocusHandlers.push(this.formFieldConfig.handleOnFocus)
    if (this.formFieldConfig.handleOnInput) this.field._onInputHandlers.push(this.formFieldConfig.handleOnInput)
  }

  /**
   * Focuses the input element after having been rendered to the DOM
   *
   * Is handled here instead of being called in render(), since render() is reimplemented in all FormField subclasses
   * */
  focusOnMount() {
    let observer: null|MutationObserver = null;
    const config = { attributes: true, childList: true, subtree: true };
    const mutationCallback = (mutationList: MutationRecord[], observer: MutationObserver) => {
      for (const mutation of mutationList) {
          // If the mutation observer has a target element with thisInputNodeId, we want to focus it, otherwise do nothing
          if (!(mutation.target instanceof HTMLElement) || mutation.target.id !== this.field.inputId) continue

          mutation.target.focus()
          observer.disconnect()
          break
      }
    };

    observer = new MutationObserver(mutationCallback);
    const targetNode = document.querySelector(this.field._form?._config?.el || '')

    if (targetNode) observer.observe(targetNode, config);
  }
}