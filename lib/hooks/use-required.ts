import {Hook} from '../types/interfaces/Hook.interface'
import {FormField} from "../FormField";

export const useRequired: Hook = () => {
  return {
    validators: {
      checkRequired(field: FormField) {
        const isValid = !!field.getValue() || field.getValue() === '0'

        if (!field.errors.includes('required') && !isValid) field.errors.push('required')
        if (field.errors.includes('required') && isValid) field.errors.splice(field.errors.indexOf('required'), 1)

        return isValid
      }
    },
  }
}