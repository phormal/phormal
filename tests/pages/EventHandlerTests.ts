// eslint-disable-file @typescript-eslint/ban-ts-comment
import {defineComponent, h} from "vue";
import {Phormal} from "@phormal/core/src";
import CodeElement from "../components/code-element";

export default defineComponent({
  name: "EventHandlerTests",

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        foo: {
          label: 'Foo',
          handleOnClick() {
            // @ts-ignore
            this.clicked = this.clicked + 1
          },
          handleOnBlur: () => {
            // @ts-ignore
            this.blurred = this.blurred + 1
          },
          handleOnFocus: () => {
            // @ts-ignore
            this.focused = this.focused + 1
          },
          handleOnChange: () => {
            // @ts-ignore
            this.changed = this.changed + 1
          },
          handleOnInput: () => {
            // @ts-ignore
            this.input = this.input + 1
          }
        },
        bar: {
          label: 'Bar',
          hooks: [
            {
              handleOnClick: () => {
                // @ts-ignore
                this.clicked = this.clicked + 1
              },
              handleOnBlur: () => {
                // @ts-ignore
                this.blurred = this.blurred + 1
              },
              handleOnFocus: () => {
                // @ts-ignore
                this.focused = this.focused + 1
              },
              handleOnChange: () => {
                // @ts-ignore
                this.changed = this.changed + 1
              },
              handleOnInput: () => {
                // @ts-ignore
                this.input = this.input + 1
              }
            }
          ]
        }
      },

      formValues: {} as Record<string, any>|undefined,

      clicked: 0,
      blurred: 0,
      focused: 0,
      changed: 0,
      input: 0,
    }
  },

  mounted() {
    const url = window.location.href
    const themeQueryString = url.match(/theme=(\w+)/)

    const theme = !themeQueryString || !themeQueryString.length
      ? 'basic'
      : (themeQueryString[0].split('=')[1]) as 'basic' | 'material'

    this.form = new Phormal(this.formFields, { el: '#phormal', theme })
  },

  render() {
    const phormal = h('div', { id: 'phormal' })

    return h("div", { id: 'page-wrapper' },[
      phormal,
      h(CodeElement, { code: this.formValues || {} }),
      h('p', ['Clicked: ', this.clicked]),
      h('p', ['Blurred: ', this.blurred]),
      h('p', ['Focused: ', this.focused]),
      h('p', ['Changed: ', this.changed]),
      h('p', ['Input: ', this.input]),
    ])
  }
})