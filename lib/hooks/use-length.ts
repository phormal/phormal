import {HookReturnValue} from '../types/interfaces/Hook.interface'

export const useLength = (minLength: number, maxLength: number): HookReturnValue => {
  return {
    validators: {
      checkLength() {
        const thisValue = this.getValue()
        
        const isValid = (thisValue.length >= minLength && thisValue.length <= maxLength)

        if (!this.errors.includes('length') && !isValid) this.errors.push('length')
        if (this.errors.includes('length') && isValid) this.errors.splice(this.errors.indexOf('length'), 1)

        return isValid
      }
    }
  }
}