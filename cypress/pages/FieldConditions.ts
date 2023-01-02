import useRequired from "../../packages/use-required/src";
import useLength from "../../packages/use-length/src";
import {Phormal} from '../../packages/core/src'
import {defineComponent, h} from "vue";

export default defineComponent({
  name: 'App',

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        field1: {
          label: 'First name',
          hooks: [useRequired(), useLength(1, 155)],
          value: 'John',
          disabledIf: {
            field2: /test/,
          }
        },
        field2: {
          label: 'Last name',
          hooks: [useRequired(), useLength(1, 155)],
          value: '',
          disabledIf: {
            field1: 'empty'
          }
        },

        field3: {
          label: 'Disabled field',
          disabled: true,
        },

        disableIfField1IsNotEmpty: {
          label: 'Disabled if field1 is empty',
          disabledIf: {
            field1: 'not-empty'
          }
        },

        hideThisIfField1IsEmpty: {
          label: 'Hide this if field1 is empty',
          hideIf: {
            field1: 'empty'
          }
        },
      },
    }
  },

  mounted() {
    this.form = new Phormal(this.formFields, {
      el: '#phormal',
      validation: 'active'
    })
  },

  render() {
    return h('div', { id: 'phormal' })
  }
})
