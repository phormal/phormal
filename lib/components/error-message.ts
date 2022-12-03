import {h, MaquetteComponent} from 'maquette'
import {ErrorMessageObject} from "../types/globals";

export default class ErrorMessage implements MaquetteComponent {
  private readonly errorMsgId: string
  private errors: string[]
  private errorMessages: { [p: string]: string | ErrorMessageObject };
  private language: string;

  constructor(
    id: string,
    errors: string[],
    errorMessages: { [key: string]: string | ErrorMessageObject },
    language: string,
  ) {
    this.errorMsgId = id
    this.errors = errors
    this.errorMessages = errorMessages
    this.language = language
  }

  listOfErrors = () => {
    return h('ul', {}, this.errors.map(error => {
      let errorMsg = this.errorMessages[error]
      if (typeof errorMsg === 'object') {
        errorMsg = errorMsg[this.language]
          ? errorMsg[this.language]
          : errorMsg['en']
      }
      if (typeof errorMsg === 'undefined') errorMsg = this.errorMessages[error]

      return h('li', {}, [errorMsg])
    }))
  }

  render() {
    return h(
      'div',
      {
        id: this.errorMsgId,
        styles: { color: 'red' },
        class: 'sflib__error-message'
      },
      [this.listOfErrors()]
    )
  }
}