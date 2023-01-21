import {defineComponent, h} from "vue";
import {Phormal, useRequired} from "../../packages/core/src";
import CodeElement from "../components/code-element";

export default defineComponent({
  name: "DateAndTimeTests",

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        date: {
          type: 'date',
          label: 'Date',
          min: '2023-01-01',
          max: '2023-12-31',
        },
        datetimeLocal: {
          type: 'datetime-local',
          label: 'Datetime',
          hooks: [useRequired()],
          value: '2023-01-01T00:00',
          min: '2023-01-01T00:00',
          max: '2023-03-20T00:00',
        },
        time: {
          type: 'time',
          label: 'Time',
          hooks: [useRequired()],
          min: '01:00',
          max: '23:00',
        },
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
      h('button', { onClick: () => this.form!.$values(), id: 'getValues' }, 'Get values')
    ])
  }
})
