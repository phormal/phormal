import {HookReturnValue} from "@phormal/core/src/types/interfaces/Hook.interface";
import {FormField} from "@phormal/core/src";
import {ValidationHelper} from "../util/validation-helper";

export const useEmail = (): HookReturnValue => {
  const ERROR_NAME = 'email';
  // eslint-disable-next-line
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  return {
    validators: {
      checkEmail(field: FormField) {
        const currentValue = field.getValue() as string
        const isValid = emailRegex.test(currentValue)
        ValidationHelper.pushOrSpliceError(field, ERROR_NAME, isValid)
      }
    },

    errorMessages: {
      [ERROR_NAME]: {
        en: 'Invalid email',
        ru: 'Неверный адрес электронной почты',
        es: 'Correo electrónico no válido',
        tr: 'Geçersiz e-posta',
        fa: 'ایمیل نامعتبر',
        fr: 'Courriel non valide',
        de: 'Ungültige E-Mail-Adresse',
        ja: '無効なメール',
        it: 'Email non valida',
        pt: 'E-mail inválido',
        zh: '无效的电子邮件',
        vi: 'Email không hợp lệ',
      }
    }
  }
}
