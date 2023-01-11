import {Hook, HookReturnValue} from "@phormal/core/src/types/interfaces/Hook.interface";
import {FormField} from "@phormal/core/src";
/**
 * This hook requires:
 *
 * 1. usage only on a field of type 'text'
 * 2. the presence of another field named 'country', which can have a value
 * of any ISO 3166 Alpha-2 Code: https://www.iso.org/obp/ui/#search/code/
 * */
export const useValidZip: Hook = (): HookReturnValue => {
  const ERROR_NAME = 'zip';

  return {
    dependencies: ['country'],

    validators: {
      checkZipCode(field: FormField) {
        const currentValue = field.getValue() as string
        let currentCountryValue = field._form._getValue('country') as string
        currentCountryValue = currentCountryValue.toLowerCase()
        const countryHasPattern = typeof zipCodePatterns[currentCountryValue] !== 'undefined'
        const isValid = countryHasPattern ? zipCodePatterns[currentCountryValue].test(currentValue) : true

        if (!field.errors.includes(ERROR_NAME) && !isValid) field.errors.push(ERROR_NAME)
        if (field.errors.includes(ERROR_NAME) && isValid) field.errors.splice(field.errors.indexOf(ERROR_NAME), 1)
      }
    },

    errorMessages: {
      [ERROR_NAME]: {
        en: 'Invalid zip code',
        ru: 'Неверный почтовый индекс',
        es: 'Código postal no válido',
        tr: 'Geçersiz posta kodu',
        // fa: 'کد پستی نادرست',
        fr: 'Code postal non valide',
        de: 'Ungültige Postleitzahl',
        ja: '無効な郵便番号',
        it: 'Codice postale non valido',
        pt: 'Código postal inválido',
        zh: '无效的邮政编码',
        vi: 'Mã bưu chính không hợp lệ',
      }
    }
  }
}

const zipCodePatterns: Record<string, RegExp> = {
  'us': /^\d{5}(-\d{4})?$/,
  'de': /^\d{5}$/,
  'mx': /^\d{5}$/,
  'fr': /^\d{5}$/,
  'ca': /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
}