import {FormField} from "../FormField";
import {HookReturnValue} from "../types/interfaces/Hook.interface";

/**
 * This helper merges the hooks return value with its form field counterpart.
 * */
export class FieldHooksResolver {
  constructor(field: FormField, hooks: HookReturnValue[]) {
    for (const hook of hooks) {
      // 1. Merge validators into the field
      if (hook.validators) {
        Object.assign(field.validators, {...hook.validators})
      }

      // 2. Merge event handlers into the field
      if (typeof hook.handleOnInput === 'function') field._onInputHandlers.push(hook.handleOnInput)
      if (typeof hook.handleOnClick === 'function') field._onClickHandlers.push(hook.handleOnClick)
      if (typeof hook.handleOnChange === 'function') field._onChangeHandlers.push(hook.handleOnChange)
      if (typeof hook.handleOnBlur === 'function') field._onBlurHandlers.push(hook.handleOnBlur)
      if (typeof hook.handleOnFocus === 'function') field._onFocusHandlers.push(hook.handleOnFocus)

      // 3. Merge error messages into the field
      if (hook.errorMessages) {
        field._errorMessages = {
          ...field._errorMessages,
          ...hook.errorMessages,
        }
      }

      // 4. Mix in dependencies
      if (hook.dependencies) field.dependencies.push(...hook.dependencies)
    }
  }
}