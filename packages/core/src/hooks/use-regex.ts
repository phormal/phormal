import {HookReturnValue} from "@phormal/core/src/types/interfaces/Hook.interface";
import {FormField} from "@phormal/core/src";
import {ValidationHelper} from "../util/validation-helper";

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
        ValidationHelper.pushOrSpliceError(field, ERROR_NAME, isValid)
      }
    },

    errorMessages: {
      regex: {
        en: 'Input does not have expected format',
        ru: 'Входные данные не имеют ожидаемого формата',
        es: 'La entrada no tiene el formato esperado',
        tr: 'Girdi beklenen biçime sahip değil',
        fa: 'ورودی دارای قالب مورد انتظار نیست',
        fr: `L'entrée n'a pas le format attendu`,
        de: 'Die Eingabe hat nicht das erwartete Format',
        ja: '入力が期待された形式でない',
        it: 'L\'input non ha il formato previsto',
        pt: 'A entrada não tem o formato esperado',
        zh: '输入没有预期的格式',
        vi: 'Đầu vào không ở định dạng dự kiến',
      },
      regexReadableFormat: {
        en: `Input does not have expected format. Expected format: ${readableExpectedFormat}`,
        ru: `Входные данные не имеют ожидаемого формата. Ожидаемый формат: ${readableExpectedFormat}`,
        es: `La entrada no tiene el formato esperado. Formato esperado: ${readableExpectedFormat}`,
        tr: `Giriş beklenen biçime sahip değil. Beklenen biçim: ${readableExpectedFormat}`,
        fa: `${readableExpectedFormat}ورودی دارای قالب مورد انتظار نیست. قالب مورد انتظار: `,
        fr: `L'entrée n'a pas le format attendu. Format attendu: ${readableExpectedFormat}`,
        de: `Die Eingabe hat nicht das erwartete Format. Erwartetes Format: ${readableExpectedFormat}`,
        ja: `入力が期待された形式でない。期待される形式： ${readableExpectedFormat}.`,
        it: `L'input non ha il formato previsto. Formato atteso: ${readableExpectedFormat}`,
        pt: `A entrada não tem o formato esperado. Formato esperado: ${readableExpectedFormat}`,
        zh: `输入的内容没有预期的格式。预期格式：${readableExpectedFormat}。`,
        vi: `Đầu vào không ở định dạng dự kiến. Định dạng dự kiến: ${readableExpectedFormat}`,
      }
    }
  }
}
