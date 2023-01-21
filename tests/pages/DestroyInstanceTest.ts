import {defineComponent, h} from "vue";
import {Phormal} from "../../packages/core/src";
import CodeElement from "../components/code-element";

export default defineComponent({
  name: "DestroyInstanceTests",

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        foo: {
          label: 'Foo',
          type: 'checkbox',
          value: true,
        }
      },

      formValues: {} as Record<string, any>|undefined,
    }
  },

  mounted() {
    this.form = new Phormal(this.formFields, { el: '#phormal' })
  },

  render() {
    const phormal = h('div', { id: 'phormal' })

    return h("div",[
      phormal,
      h(CodeElement, { code: this.formValues || {} }),
      h('button', { onClick: () => this.form!.$destroy(), id: 'destroy' }, 'Kaputt machen')
    ])
  }
})
