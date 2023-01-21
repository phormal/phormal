import {h, MaquetteComponent, VNodeChild} from 'maquette'
import {ErrorMessageObject} from "../types/globals";

export default class ErrorMessage implements MaquetteComponent {

  constructor(
    private readonly errorMsgId: string,
    private readonly errors: string[],
    private readonly errorMessages: Record<string, ErrorMessageObject>,
    private readonly language: string,
    private readonly fallbackLanguage: string,
  ) {}

  render() {
    return h(
      'div',
      {
        id: this.errorMsgId,
        class: 'phlib__error-message'
      },
      [this.getErrorMessageElements() as VNodeChild]
    )
  }

  private getErrorMessageElements() {
    return h('ul', {}, this.errors.map(error => {
      // errorMessages here, should represent an object with key-value pairs, where the key is a locale like "en" or "de",
      // and the value being the translation
      const errorMessages = this.errorMessages[error]
      const errorMessageTranslation = errorMessages[this.language] || errorMessages[this.fallbackLanguage]

      return h('li', {}, [errorMessageTranslation as VNodeChild])
    }))
  }
}
