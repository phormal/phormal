import {Phormal, useRegex, useLength, useEmail} from '../../packages/core/src'
import {defineComponent, h} from "vue";
import CodeElement from "../components/code-element";

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
        },
        newsletter: {
          label: 'Newsletter',
          type: 'checkbox',
          hooks: [useRegex(/true/i)],
        }
      },
    }
  },

  mounted() {
    const url = window.location.href
    const validationQueryString = url.match(/type=(\w+)/)

    const validation = !validationQueryString || !validationQueryString.length
      ? 'active'
      : (validationQueryString[0].split('=')[1]) as 'active' | 'passive'

    this.form = new Phormal(this.formFields, {
      el: '#phormal',
      validation,
    })
  },

  render() {
    const phormal = h('div', { id: 'phormal' })

    return h("div",[
      phormal,
      h('button', { onClick: () => this.form?.$validate(), id: 'validate-button' }, 'Validate')
    ])
  }
})
