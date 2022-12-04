import {FormField} from "../FormField";

/**
 * A helper for resolving field dependencies.
 * */
export class FieldDependencyResolver {
  constructor(field: FormField) {
    for (const dependency of field.dependencies) {
      if (!field._form._fields[dependency]) continue // Skip, if the field does not exist
      if (field._form._fields[dependency].dependants?.includes(field.name)) continue // Skip, if the targeted field already has this field as a dependant

      field._form._fields[dependency].dependants?.push(field.name)
    }
  }
}