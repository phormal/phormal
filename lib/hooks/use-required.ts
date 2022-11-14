import {Hook} from '../types/interfaces/Hook.interface'

export const useRequired: Hook = () => {
  return {
    validators: {
      checkRequired() {
        const isValid = !!this.getValue() || this.getValue() === '0'

        if (!this.errors.includes('required') && !isValid) this.errors.push('required')
        if (this.errors.includes('required') && isValid) this.errors.splice(this.errors.indexOf('required'), 1)

        return isValid
      }
    },
  }
}