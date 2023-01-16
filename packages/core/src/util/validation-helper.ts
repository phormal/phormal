import {FormField} from "../FormField";

export class ValidationHelper {

  static pushOrSpliceError (field: FormField, errorName: string, isValid: boolean) {
    if (!field.errors.includes(errorName) && !isValid) field.errors.push(errorName)
    if (field.errors.includes(errorName) && isValid) field.errors.splice(field.errors.indexOf(errorName), 1)
  }
}
