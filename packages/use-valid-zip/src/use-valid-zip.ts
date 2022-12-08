import {Hook, HookReturnValue} from '../../core/src/types/interfaces/Hook.interface'
import {FormField} from "../../core/src";

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
        const currentCountryValue = field._form._getValue('country') as string
        const countryHasPattern = zipCodePatterns.hasOwnProperty(currentCountryValue)
        const isValid = countryHasPattern ? zipCodePatterns[currentCountryValue].test(currentValue) : true

        if (!field.errors.includes(ERROR_NAME) && !isValid) field.errors.push(ERROR_NAME)
        if (field.errors.includes(ERROR_NAME) && isValid) field.errors.splice(field.errors.indexOf(ERROR_NAME), 1)
      }
    },

    errorMessages: {
      [ERROR_NAME]: {
        en: 'Invalid zip code',
        es: 'Código postal inválido',
        de: 'Ungültige Postleitzahl',
        fr: 'Code postal invalide',
        it: 'Codice postale non valido',
        pt: 'Código postal inválido',
        ru: 'Неверный почтовый индекс',
        zh: '邮政编码无效',
        ja: '無効な郵便番号',
        ko: '잘못된 우편 번호',
        nl: 'Ongeldige postcode',
        pl: 'Nieprawidłowy kod pocztowy',
        sv: 'Ogiltigt postnummer',
        tr: 'Geçersiz posta kodu',
        vi: 'Mã bưu chính không hợp lệ',
        ar: 'رمز بريد غير صالح',
        el: 'Μη έγκυρος ταχυδρομικός κώδικας',
        hi: 'अमान्य ज़िप कोड',
        ms: 'Kod Zip tidak sah',
        th: 'รหัสไปรษณีย์ไม่ถูกต้อง',
        id: 'Kode pos tidak valid',
        hu: 'Érvénytelen irányítószám',
        fa: 'کد پستی نامعتبر است',
        ca: 'Codi postal no vàlid',
        da: 'Ugyldig postnummer',
        fi: 'Virheellinen postinumero',
        nb: 'Ugyldig postnummer',
        uk: 'Невірний поштовий індекс',
        ro: 'Cod poștal nevalid',
        cs: 'Neplatné PSČ',
        sk: 'Neplatné PSČ',
        bg: 'Невалиден пощенски код',
        et: 'Vigane postiindeks',
        lt: 'Neteisingas pašto kodas',
        lv: 'Nederīgs pasta indekss',
        sr: 'Neispravan poštanski broj',
        hr: 'Neispravan poštanski broj',
        sl: 'Neveljaven poštni številka',
      }
    }
  }
}

const zipCodePatterns: Record<string, RegExp> = {
  'US': /^\d{5}(-\d{4})?$/,
  'DE': /^\d{5}$/,
  'MX': /^\d{5}$/,
  'FR': /^\d{5}$/,
  'CA': /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
}