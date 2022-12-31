import FormFieldInterface from "../types/interfaces/FormField.interface";

export class FormInitializer {
  
  static getFormRowRepresentation(fields: Record<string, FormFieldInterface>) {
    const fieldsInRowRepresentation: string[] = []
    
    return Object.entries(fields).reduce((acc: Array<FormFieldInterface[]>, [fieldName, field]) => {
      if (fieldsInRowRepresentation.includes(fieldName)) return acc

      const row = []
      row.push(field)
      fieldsInRowRepresentation.push(fieldName)

      if (field.row) {
        // Collect all fields with the same "row" value, in one row
        for (const [additionalFieldName, additionalField] of Object.entries(fields)) {
          if (additionalField.row === row[0].row && !fieldsInRowRepresentation.includes(additionalFieldName)) {
            row.push(additionalField)
            fieldsInRowRepresentation.push(additionalFieldName)
          }
        }
      }

      acc.push(row)

      return acc
    }, [])
  }

  static renderAllFields(
    formRows: ReadonlyArray<FormFieldInterface[]>,
    mountingElement: HTMLElement,
  ) {
    for (const row of formRows) {
      if (row.length === 1) {
        row[0].render(mountingElement)
        continue
      }

      const rowClass = `phlib__row-${row[0].row}`  // All fields in a row have the same row name
      const rowElement = document.createElement('div')
      rowElement.classList.add('phlib__multiple-fields-row', `phlib__row-${rowClass}`)
      mountingElement.appendChild(rowElement)

      for (const field of row) {
        field.render(rowElement)
      }
    }
  }
}