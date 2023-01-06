import useRequired from "../../packages/use-required/src";
import useLength from "../../packages/use-length/src";
import useAutoCapitalize from "../../packages/use-auto-capitalize/src";
import useValidZip from "../../packages/use-valid-zip/src";
import {Phormal} from '@phormal/core/src'
import {defineComponent, h} from "vue";

export default defineComponent({
  name: 'App',

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        delivery: {
          type: 'radiogroup',
          label: 'Delivery to',
          value: 'shipping',
          options: [
            {label: 'Billing', value: 'billing'},
            {label: 'Shipping', value: 'shipping'},
            {label: 'Packstation', value: 'packstation'},
          ]
        },
        firstName: {
          label: 'First name',
          hooks: [useRequired(), useLength(1, 155), useAutoCapitalize()],
          value: 'John',
          focus: true
        },
        lastName: {
          label: 'Last name',
          hooks: [useRequired(), useLength(1, 155)],
          value: 'Doe',
        },
        yyyy: {
          value: '',
          label: 'YYYY',
          row: 'birthdate',
        },
        mm: {
          value: '',
          label: 'MM',
          row: 'birthdate',
        },
        dd: {
          value: '',
          label: 'DD',
          row: 'birthdate',
        },
        country: {
          type: 'select',
          label: 'Country',
          hooks: [useRequired()],
          value: 'US',
          options: [
            {value: 'US', label: 'United States'},
            {value: 'CA', label: 'Canada'},
            {value: 'MX', label: 'Mexico'},
            {value: 'FR', label: 'France'},
            {value: 'DE', label: 'Germany'},
            {value: 'HK', label: 'Hong Kong'},
          ],
        },
        zip: {
          label: 'ZIP code',
          hooks: [useRequired(), useLength(1, 155), useValidZip()],
          value: '51378',
        },
        newsletter: {
          type: 'checkbox',
          label: 'Newsletter',
          hooks: [],
          value: true,
        },
      },

      lastNameFocusN: 0,
      firstNameBlurN: 0,
    }
  },

  mounted() {
    const url = window.location.href
    const themeQueryString = url.match(/theme=(\w+)/)

    const theme = !themeQueryString || !themeQueryString.length
      ? 'basic'
      : (themeQueryString[0].split('=')[1]) as 'basic' | 'material'

    this.form = new Phormal(this.formFields, {
      el: '#phormal',
      language: 'en',
      validation: 'active',
      theme,
    })
  },

  render() {
    return h('div', { id: 'phormal' })
  }
})

