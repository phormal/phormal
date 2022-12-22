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
        ru: 'Это поле обязательно для заполнения',
        de: 'Dieses Feld ist erforderlich',
        fr: 'Ce champ est obligatoire',
        es: 'Este campo es obligatorio',
        it: 'Questo campo è obbligatorio',
        nl: 'Dit veld is verplicht',
        pl: 'To pole jest wymagane',
        pt: 'Este campo é obrigatório',
        tr: 'Bu alan zorunludur',
        zh: '此字段为必填项',
        ja: 'このフィールドは必須です',
        ko: '이 필드는 필수입니다',
        ar: 'هذا الحقل مطلوب',
        id: 'Bidang ini diperlukan',
        ms: 'Bidang ini diperlukan',
        th: 'ต้องระบุช่องนี้',
        vi: 'Trường này là bắt buộc',
        hi: 'यह फ़ील्ड आवश्यक है',
        bn: 'এই ক্ষেত্রটি প্রয়োজন',
        ca: 'Aquest camp és obligatori',
        cs: 'Toto pole je povinné',
        da: 'Dette felt er påkrævet',
        el: 'Αυτό το πεδίο είναι υποχρεωτικό',
        et: 'See väli on kohustuslik',
        fa: 'این فیلد اجباری است',
        fi: 'Tämä kenttä on pakollinen',
        he: 'שדה זה הינו שדה חובה',
        hu: 'Ez a mező kötelező',
        is: 'Þessi reitur er nauðsynlegur',
        lt: 'Šis laukas yra privalomas',
        lv: 'Šis lauks ir obligāts',
        no: 'Dette feltet er påkrevd',
        ro: 'Acest câmp este obligatoriu',
      }
    },
  }
}