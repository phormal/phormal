import {FormField} from "../FormField";

/**
 * A helper for resolving field dependencies.
 * */
export class FieldDependencyResolver {
  constructor(field: FormField) {
    for (const dependency of field.dependencies) {
      /* istanbul ignore if -- @preserve */
      if (
        !field._form._fields[dependency] // Skip, if the field does not exist
        || field._form._fields[dependency].dependants?.includes(field.name) // Skip, if the targeted field already has this field as a dependant
      ) continue

      field._form._fields[dependency].addDependant(field.name)
    }
  }
}