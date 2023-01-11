import {HookReturnValue} from "@phormal/core/src/types/interfaces/Hook.interface";
import {FormField} from "@phormal/core/src/FormField";

export const useLength = (minLength: number|undefined|null, maxLength?: number|undefined|null): HookReturnValue => {
  const LENGTH_ERROR_NAME = 'length'
  const MIN_LENGTH_ERROR_NAME = 'minLength'
  const MAX_LENGTH_ERROR_NAME = 'maxLength'

  return {
    validators: {
      checkLength(field: FormField) {
        let errorName = LENGTH_ERROR_NAME
        let isValid = false
        const thisValue = field.getValue() as string

        if (typeof minLength === 'number' && typeof maxLength === 'number') {
          errorName = LENGTH_ERROR_NAME
          isValid = thisValue.length >= minLength && thisValue.length <= maxLength
        }

        else if (typeof minLength === 'number' && typeof maxLength === 'undefined') {
          errorName = MIN_LENGTH_ERROR_NAME
          isValid = thisValue.length >= minLength
        }

        else if (typeof minLength === 'undefined' && typeof maxLength === 'number') {
          errorName = MAX_LENGTH_ERROR_NAME
          isValid = thisValue.length <= maxLength
        }

        if (!field.errors.includes(errorName) && !isValid) field.errors.push(errorName)
        if (field.errors.includes(errorName) && isValid) field.errors.splice(field.errors.indexOf(errorName), 1)
      }
    },
    errorMessages: {
      [LENGTH_ERROR_NAME]: {
        en: `This field must be between ${minLength} and ${maxLength} characters long`,
        ru: `Этот ввод должен быть длиной от ${minLength} до ${maxLength} символов`,
        es: `Esta entrada debe tener entre ${minLength} y ${maxLength} caracteres`,
        tr: `Bu girdi ${minLength} ile ${maxLength} karakterleri arasında olmalıdır`,
        // fa: `این ورودی باید بین نویسه ${minLength} و ${maxLength} باشد`,
        fr: `Cette entrée doit avoir une longueur comprise entre ${minLength} et ${maxLength} caractères`,
        de: `Die Eingabe muss zwischen ${minLength} und ${maxLength} Zeichen lang sein`,
        ja: `入力は ${minLength} から ${maxLength} までの文字数でなければなりません。`,
        it: `L'input deve essere di lunghezza compresa tra ${minLength} e ${maxLength}`,
        pt: `A entrada deve ter caracteres entre ${minLength} e ${maxLength}`,
        zh: `输入的字符长度必须在${minLength}和${maxLength}之间。`,
        vi: `Dữ liệu nhập vào phải dài từ ${minLength} đến ${maxLength} ký tự`,
      },

      [MIN_LENGTH_ERROR_NAME]: {
        en: `This field must be at least ${minLength} characters long`,
        ru: `Этот ввод должен быть длиной не менее ${minLength} символов`,
        es: `Esta entrada debe tener al menos ${minLength} caracteres`,
        tr: `Bu girdi en az ${minLength} karakter uzunluğunda olmalıdır`,
        // fa: `این ورودی باید حداقل ${minLength} نویسه داشته باشد`,
        fr: `Cette entrée doit comporter au moins ${minLength} caractères.`,
        de: `Die Eingabe muss mindestens ${minLength} Zeichen lang sein`,
        ja: `入力は少なくとも ${minLength} 文字の長さである必要があります。`,
        it: `L'input deve essere lungo almeno ${minLength} caratteri`,
        pt: `A entrada deve ter pelo menos ${minLength} caracteres`,
        zh: `输入的内容必须至少是${minLength}的字符长度。`,
        vi: `Dữ liệu nhập vào phải dài ít nhất ${minLength} ký tự`,
      },

      [MAX_LENGTH_ERROR_NAME]: {
        en: `This field must be at most ${maxLength} characters long`,
        ru: `Этот ввод должен быть длиной не более ${maxLength} символов`,
        es: `Esta entrada debe tener como máximo ${maxLength} caracteres`,
        tr: `Bu girdi en fazla ${maxLength} karakter uzunluğunda olmalıdır`,
        // fa: `این ورودی باید حداکثر ${maxLength} کاراکتر داشته باشد.`,
        fr: `Cette entrée doit comporter au maximum ${maxLength} caractères`,
        de: `Die Eingabe darf höchstens ${maxLength} Zeichen lang sein`,
        ja: `入力は最大で ${maxLength} 文字の長さである必要があります。`,
        it: `L'input deve avere una lunghezza massima di ${maxLength} caratteri`,
        pt: `A entrada deve ter no máximo ${maxLength} caracteres`,
        zh: `输入的内容必须是最多${maxLength}的字符。`,
        vi: `Dữ liệu nhập phải dài tối đa ${maxLength} ký tự`,
      }
    }
  }
}