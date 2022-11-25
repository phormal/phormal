import {h, MaquetteComponent} from 'maquette'

export default class ErrorMessage implements MaquetteComponent {
  private readonly errorMsgId: string
  private errors: string[]

  constructor(
    id: string,
    errors: string[]
  ) {
    this.errorMsgId = id
    this.errors = errors
  }

  render() {
    return h(
      'div',
      { id: this.errorMsgId, styles: { color: 'red' } },
      ['Error! ' + this.errors.join(', ')])
  }
}