/**
 * A utility class for creating FormField-classes
 * */
import {Phormal} from "../Phormal";
import {FormField} from "../FormField";
import {MultiSelect} from "../fields/MultiSelect";
import {Checkbox} from "../fields/Checkbox";

export class FormFieldsFactory {

  constructor(
    private phormal: Phormal
  ) {
    for (const [fieldName, fieldConfig] of Object.entries(this.phormal._unprocessedFields)) {
      // Set the field's value to the default value if it exists
      // The value for each field is stored on the main Phormal-instance, instead of in each field-instance. This allows for a sleeker API => form.fieldName instead of form.fields.fieldName
      Object.assign(this.phormal, {[fieldName]: fieldConfig.value})

      let FormFieldClass = FormField
      if (fieldConfig.type === 'select') FormFieldClass = MultiSelect
      if (fieldConfig.type === 'checkbox') FormFieldClass = Checkbox

      this.phormal._fields[fieldName] = new FormFieldClass(
        fieldName,
        fieldConfig,
        this.phormal,
      )
    }
  }
}