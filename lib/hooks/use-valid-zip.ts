import {Hook, HookReturnValue} from '../types/interfaces/Hook.interface'
import {FormField} from "../FormField";

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
      checkZipCode(field: FormField) {
        const currentValue = field.getValue()
        const currentCountryValue = field._form.getValue('country')
        const countryHasPattern = zipCodePatterns.hasOwnProperty(currentCountryValue)
        const isValid = countryHasPattern ? zipCodePatterns[currentCountryValue].test(currentValue) : true

        const errorName = 'zip'
        if (!field.errors.includes(errorName) && !isValid) field.errors.push(errorName)
        if (field.errors.includes(errorName) && isValid) field.errors.splice(field.errors.indexOf(errorName), 1)

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