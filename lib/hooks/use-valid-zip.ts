import {Hook, HookReturnValue} from '../types/interfaces/Hook.interface'

/**
 * This hook requires:
 *
 * 1. usage only on a field of type 'text'
 * 2. the presence of another field named 'country', which can have a value
 * of any ISO 3166 Alpha-2 Code: https://www.iso.org/obp/ui/#search/code/
 * */
export const useValidZip: Hook = (): HookReturnValue => {
  return {
    validators: {
      checkZipCode() {
        const currentValue = this.getValue()
        const currentCountryValue = this.form.getValue('country')
        const countryHasPattern = zipCodePatterns.hasOwnProperty(currentCountryValue)
        const isValid = countryHasPattern ? zipCodePatterns[currentCountryValue].test(currentValue) : true

        const errorName = 'zip'
        if (!this.errors.includes(errorName) && !isValid) this.errors.push(errorName)
        if (this.errors.includes(errorName) && isValid) this.errors.splice(this.errors.indexOf(errorName), 1)

        return isValid
      }
    },
  }
}

const zipCodePatterns: { [key: string]: RegExp } = {
  'US': /^\d{5}(-\d{4})?$/,
  'DE': /^\d{5}$/,
  'MX': /^\d{5}$/,
}