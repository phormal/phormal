import {Hook} from '../types/interfaces/Hook.interface'

export const useRequired: Hook = () => {
  return {
    validateFunctions: {
      checkRequired() {
        const isValid = !!this.value || this.value === '0'

        if (!this.errors.includes('required')) this.errors.push('required')

        return isValid
      }
    },
  }
}