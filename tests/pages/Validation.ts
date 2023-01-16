import {Phormal, useRegex, useLength, useEmail, useUrl, useMinMax} from '../../packages/core/src'
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
        },
        url: {
          label: 'URL',
          hooks: [useUrl()]
        },
        urlInvalidHost: {
          label: 'URL with invalid host',
          hooks: [useUrl({allowedHosts: ['google.com', 'google.nl', 'google.be']})]
        },
        urlInvalidProtocol: {
          label: 'URL with invalid protocol',
          hooks: [useUrl({allowedProtocols: ['https', 'file:']})]
        },
        minNumeric: {
          label: 'Minimum numeric value',
          hooks: [useMinMax(15)]
        },
        maxNumeric: {
          label: 'Maximum numeric value',
          hooks: [useMinMax(null, 15)]
        },
        minMaxNumeric: {
          label: 'Minimum and maximum numeric value',
          hooks: [useMinMax(15, 16)]
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
