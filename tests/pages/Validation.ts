import useLength from "../../packages/use-length/src";
import useRegex from "../../packages/use-regex/src";
import {Phormal} from '../../packages/core/src'
import {defineComponent, h} from "vue";
import useEmail from "@phormal/use-email/src";

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
          hooks: [useLength(5, 10), useRegex(/^[a-z]+$/)],
          value: '',
        },
        emailField: {
          label: 'Email',
          hooks: [useEmail()],
          type: 'email',
        },
        birthdateField: {
          label: 'Birthdate',
          hooks: [useRegex(/^\d{4}-\d{2}-\d{2}$/i, 'YYYY-MM-DD')],
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
