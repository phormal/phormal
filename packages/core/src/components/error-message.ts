import {h, MaquetteComponent, VNodeChild} from 'maquette'
import {ErrorMessageObject} from "../types/globals";

export default class ErrorMessage implements MaquetteComponent {

  constructor(
    private readonly errorMsgId: string,
    private readonly errors: string[],
    private readonly errorMessages: Record<string, ErrorMessageObject>,
    private readonly language: string,
  ) {}

  render() {
    return h(
      'div',
      {
        id: this.errorMsgId,
        styles: { color: 'red' },
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

      return h('li', {}, [errorMessages[this.language] as VNodeChild])
    }))
  }
}