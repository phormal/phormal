import {HookReturnValue} from "@phormal/core/src/types/interfaces/Hook.interface";
import {FormField} from "@phormal/core/src";
import {ValidationHelper} from "../util/validation-helper";

export const useMinMax = (minValue: number|undefined|null, maxValue?: number): HookReturnValue => {
  const MIN_VALUE_ERROR_NAME = 'min_value';
  const MAX_VALUE_ERROR_NAME = 'max_value';
  const BETWEEN_VALUES_ERROR_NAME = 'between_values';

  return {
    validators: {
      testMinMax(field: FormField) {
        let errorName
        let isValid = true
        if (typeof minValue === 'number' && typeof maxValue !== 'number') errorName = MIN_VALUE_ERROR_NAME
        if (typeof minValue !== 'number' && typeof maxValue === 'number') errorName = MAX_VALUE_ERROR_NAME
        if (typeof minValue === 'number' && typeof maxValue === 'number') errorName = BETWEEN_VALUES_ERROR_NAME

        const currentValue = field.getValue() as string

        if (errorName === MIN_VALUE_ERROR_NAME) isValid = +currentValue >= (minValue as number)
        if (errorName === MAX_VALUE_ERROR_NAME) isValid = +currentValue <= (maxValue as number)
        if (errorName === BETWEEN_VALUES_ERROR_NAME) isValid = +currentValue >= (minValue as number) && +currentValue <= (maxValue as number)

        ValidationHelper.pushOrSpliceError(field, errorName as string, isValid)
      }
    },

    errorMessages: {
      [MIN_VALUE_ERROR_NAME]: {
        en: `Value is lower than the minimum value of ${minValue}`,
        ru: `Значение меньше минимального значения ${minValue}`,
        es: `El valor es inferior al valor mínimo de ${minValue}.`,
        tr: `Değer ${minValue} minimum değerinden düşük`,
        fa: `مقدار کمتر از مقدار حداقل ${minValue} است`,
        fr: `La valeur est inférieure à la valeur minimale de ${minValue}`,
        de: `Wert ist kleiner als der Mindestwert von ${minValue}`,
        ja: `値が最小値${minValue}より小さい。`,
        it: `Il valore è inferiore al valore minimo di ${minValue}.`,
        pt: `O valor é inferior ao valor mínimo de ${minValue}`,
        zh: `值低于${minValue}的最小值`,
        vi: `Giá trị thấp hơn giá trị tối thiểu của ${minValue}`,
      },
      [MAX_VALUE_ERROR_NAME]: {
        en: `Value is higher than the maximum value of ${maxValue}`,
        ru: `Значение больше максимального значения ${maxValue}`,
        es: `El valor es superior al valor máximo de ${maxValue}.`,
        tr: `Değer, ${maxValue} maksimum değerinden yüksek`,
        fa: `مقدار بالاتر از حداکثر مقدار ${maxValue} است`,
        fr: `La valeur est supérieure à la valeur maximale de ${maxValue}`,
        de: `Wert ist höher als der Höchstwert von ${maxValue}`,
        ja: `値が${maxValue}の最大値より大きい。`,
        it: `Il valore è maggiore del valore massimo di ${maxValue}`,
        pt: `O valor é superior ao valor máximo de ${maxValue}`,
        zh: `值高于${maxValue}的最大值`,
        vi: `Giá trị cao hơn giá trị tối đa của ${maxValue}`,
      },
      [BETWEEN_VALUES_ERROR_NAME]: {
        en: `Value is not between the minimum value of ${minValue} and the maximum value of ${maxValue}`,
        ru: `Значение не находится между минимальным значением ${minValue} и максимальным значением ${maxValue}`,
        es: `El valor no está entre el valor mínimo de ${minValue} y el valor máximo de ${maxValue}.`,
        tr: `Değer, ${minValue} minimum değeri ile ${maxValue} maksimum değeri arasında değil`,
        fa: `مقدار بین حداقل مقدار ${minValue} و حداکثر مقدار ${maxValue} نیست`,
        fr: `La valeur n'est pas comprise entre la valeur minimale de ${minValue} et la valeur maximale de ${maxValue}`,
        de: `Wert liegt nicht zwischen dem Mindestwert von ${minValue} und dem Höchstwert von ${maxValue}`,
        ja: `値が最小値${minValue}と最大値${maxValue}の間でない。`,
        it: `Il valore non è compreso tra il valore minimo di ${minValue} e il valore massimo di ${maxValue}`,
        pt: `O valor não está entre o valor mínimo de ${minValue} e o valor máximo de ${maxValue}.`,
        zh: `值不在${minValue}的最小值和${maxValue}的最大值之间`,
        vi: `Giá trị không nằm giữa giá trị tối thiểu của ${minValue} và giá trị tối đa của ${maxValue}`,
      },
    }
  }
}
