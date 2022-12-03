import {HookReturnValue} from '../types/interfaces/Hook.interface'
import {FormField} from "../FormField";

export const useLength = (minLength: number, maxLength: number): HookReturnValue => {
  return {
    validators: {
      checkLength(field: FormField) {
        console.log(field)
        const thisValue = field.getValue()
        
        const isValid = (thisValue.length >= minLength && thisValue.length <= maxLength)

        if (!field.errors.includes('length') && !isValid) field.errors.push('length')
        if (field.errors.includes('length') && isValid) field.errors.splice(field.errors.indexOf('length'), 1)

        return isValid
      }
    }
  }
}