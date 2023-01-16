import {defineComponent, h} from "vue";
import {Phormal} from "../../packages/core/src";
import CodeElement from "../components/code-element";

export default defineComponent({
  name: "CheckboxTests",

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        foo: {
          label: 'Foo',
          type: 'checkbox',
          value: true,
        },
        bar: {
          label: 'Bar',
          type: 'checkbox',
          value: false,

        },
        baz: {
          label: 'Baz',
          type: 'checkbox',
          value: true,
          disabled: true,
        },
        qux: {
          label: 'Qux',
          type: 'checkbox',
          value: false,
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
