import {Hook, HookReturnValue} from '../../core/src/types/interfaces/Hook.interface'
import {FormField} from "../../core/src";

export const useEmail: Hook = (): HookReturnValue => {
  const ERROR_NAME = 'email';
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  return {
    validators: {
      checkEmail(field: FormField) {
        const currentValue = field.getValue() as string
        const isValid = emailRegex.test(currentValue)

        if (!field.errors.includes(ERROR_NAME) && !isValid) field.errors.push(ERROR_NAME)
        if (field.errors.includes(ERROR_NAME) && isValid) field.errors.splice(field.errors.indexOf(ERROR_NAME), 1)
      }
    },

    errorMessages: {
      [ERROR_NAME]: {
        en: 'Invalid email',
      }
    }
  }
}