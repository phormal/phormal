import {defineComponent, h} from "vue";
import {Phormal} from "@phormal/core/src";
import CodeElement from "../components/code-element";

export default defineComponent({
  name: "MultiSelect",

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        foo: {
          label: 'Foo',
          value: 'foo',
        },
        bar: {
          label: 'Bar',
          type: 'select',
          value: 'bar',
          options: [
            { value: 'bar', label: 'Bar' },
            { value: 'baz', label: 'Baz' },
            { value: 'qux', label: 'Qux' },
          ],
        },
        baz: {
          type: 'select',
          value: 'erkjghrejkkhj',
          options: [
            { value: 'bar', label: 'Bar' },
            { value: 'baz', label: 'Baz' },
            { value: 'qux', label: 'Qux' },
          ],
        },
        qux: {
          label: 'Qux',
          type: 'select',
          options: [
            { value: 'bar', label: 'Bar' },
          ],
          disabled: true,
        }
      },

      formValues: {} as Record<string, any>|undefined,
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

    return h("div",[
      phormal,
      h(CodeElement, { code: this.formValues || {} }),
      h('button', { onClick: () => this.formValues = this.form?.$values(), id: 'getvalues' }, 'Get Values')
    ])
  }
})