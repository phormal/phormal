import useLength from "../../packages/use-length/src";
import {Phormal} from '../../packages/core/src'
import {defineComponent, h} from "vue";
import useEmail from "../../instrumented/use-email/src";

export default defineComponent({
  name: 'App',

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        field1: {
          label: 'First name',
          hooks: [useLength(undefined, 10)],
          value: 'John',
        },
        field2: {
          label: 'Last name',
          hooks: [useLength(5)],
          value: '',
        },
        field3: {
          label: 'Hubba bubba',
          hooks: [useLength(5, 10)],
          value: '',
        },
        emailField: {
          label: 'Email',
          hooks: [useEmail()],
          type: 'email',
        }
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
