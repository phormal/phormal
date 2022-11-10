import {Hook, HookReturnValue} from '../types/interfaces/Hook.interface'

export const useLength = (minLength: number, maxLength: number): HookReturnValue => {
  return {
    validateFunctions: {
      checkLength() {
        const isValid = (this.value.length >= minLength && this.value.length <= maxLength)

        if (!this.errors.includes('length')) this.errors.push('length')

        return isValid
      }
    }
  }
}