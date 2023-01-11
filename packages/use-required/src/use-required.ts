import {Hook} from "@phormal/core/src/types/interfaces/Hook.interface";
import {FormField} from "@phormal/core/src/FormField";

const ERROR_NAME = 'required';
export const useRequired: Hook = () => {
  return {
    validators: {
      checkRequired(field: FormField) {
        const isValid = !!field.getValue() || field.getValue() === '0'

        if (!field.errors.includes(ERROR_NAME) && !isValid) field.errors.push(ERROR_NAME)
        if (field.errors.includes(ERROR_NAME) && isValid) field.errors.splice(field.errors.indexOf(ERROR_NAME), 1)
      }
    },

    errorMessages: {
      [ERROR_NAME]: {
        en: 'This field is required',
        ru: 'Этот ввод необходим',
        es: 'Esta entrada es necesaria',
        tr: 'Bu girdi gereklidir',
        // fa: 'این ورودی مورد نیاز است',
        fr: 'Cette entrée est requise',
        de: 'Dieses Feld ist ein Pflichtfeld',
        ja: 'この入力は必須です',
        it: 'Questo input è richiesto',
        pt: 'Esta entrada é necessária',
        zh: '这个输入是必需的',
        vi: 'Đầu vào này là bắt buộc',
      }
    },
  }
}