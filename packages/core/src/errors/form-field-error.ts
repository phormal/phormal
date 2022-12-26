export class FormFieldError extends Error {

  constructor(
    errorMessage: string
  ) {
    super();
    this.name = 'FormFieldError'
    this.message = `[Phormal] ${errorMessage}`
  }
}