import {HookReturnValue} from "@phormal/core/src/types/interfaces/Hook.interface";
import {FormField} from "@phormal/core/src";

/**
 * @param {RegExp} regex
 * @param {String} readableExpectedFormat - A human-readable string that describes the expected format of the value
 * */
export const useRegex = (regex: RegExp, readableExpectedFormat?: string): HookReturnValue => {
  let ERROR_NAME = 'regex';

  return {
    validators: {
      testPattern(field: FormField) {
        if (readableExpectedFormat) ERROR_NAME = 'regexReadableFormat';

        const currentValue = field.getValue() as string
        const isValid = regex.test(currentValue)
        console.log(isValid)

        if (!field.errors.includes(ERROR_NAME) && !isValid) field.errors.push(ERROR_NAME)
        if (field.errors.includes(ERROR_NAME) && isValid) field.errors.splice(field.errors.indexOf(ERROR_NAME), 1)
      }
    },

    errorMessages: {
      regex: {
        en: 'Input does not have expected format',
        de: 'Eingabe hat nicht das erwartete Format',
      },
      regexReadableFormat: {
        en: `Input does not have expected format. Expected format: ${readableExpectedFormat}`,
        de: `Eingabe hat nicht das erwartete Format. Erwartetes Format: ${readableExpectedFormat}`,
      }
    }
  }
}