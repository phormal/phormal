import {HookReturnValue} from '../types/interfaces/Hook.interface'

export const useLength = (minLength: number, maxLength: number): HookReturnValue => {
  return {
    validators: {
      checkLength() {
        const isValid = (this.value.length >= minLength && this.value.length <= maxLength)

        if (!this.errors.includes('length') && !isValid) this.errors.push('length')
        if (this.errors.includes('length') && isValid) this.errors.splice(this.errors.indexOf('length'), 1)

        return isValid
      }
    }
  }
}