import {
  useLength,
  useAutoCapitalize,
  Phormal,
  useRequired,
  useValidZip,
  translationName, translationPassword
} from "../../packages/core/src";
import {defineComponent, h} from "vue";

export default defineComponent({
  name: 'App',

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        date: {
          type: 'date',
          label: 'Date',
          value: '2020-01-01',
        },
        datetimeLocal: {
          type: 'datetime-local',
          label: 'Datetime',
          value: '2020-01-01T12:00',
        },
        time: {
          type: 'time',
          label: 'Time',
          value: '12:00',
        },
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
          label: translationName,
          hooks: [useRequired(), useLength(1, 155)],
          value: 'Doe',
        },
        yyyy: {
          value: '',
          label: 'YYYY',
          row: 'birthdate',
          placeholder: 'Enter birth year',
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
        password: {
          label: translationPassword,
          type: 'password',
        }
      },

      lastNameFocusN: 0,
      firstNameBlurN: 0,
      isDirty: null as null|boolean,
    }
  },

  mounted() {
    const url = window.location.href
    const themeQueryString = url.match(/theme=(\w+)/)
    const theme = !themeQueryString || !themeQueryString.length
      ? 'basic'
      : (themeQueryString[0].split('=')[1]) as 'basic' | 'material'

    const fallbackLangQueryString = url.match(/fallbackLang=(\w+)/)
    const fallbackLang = !fallbackLangQueryString || !fallbackLangQueryString.length
      ? undefined
      : (fallbackLangQueryString[0].split('=')[1]) as string

    const langQueryString = url.match(/lang=(\w+)/)
    const lang = !langQueryString || !langQueryString.length
      ? undefined
      : (langQueryString[0].split('=')[1]) as string

    this.form = new Phormal(this.formFields, {
      el: '#phormal',
      language: lang,
      validation: 'active',
      theme,
      fallbackLanguage: fallbackLang,
    })
  },

  methods: {
    getDirtinessStatus() {
      this.isDirty = this.form!.$isDirty;
    },

    reset() {
      this.form!.$reset();
    },

    resetDates() {
      this.form!.$reset('yyyy', 'mm', 'dd');
    }
  },

  render() {
    const formEl = h(
      'div',
      { id: 'phormal' },
    )

    const otherEls = [
      h('button', { id: 'get-dirtiness', onClick: () => this.getDirtinessStatus()},['Get dirtiness status']),
      h('div', { id: 'is-dirty'}, ['is dirty: ' + this.isDirty]),
      h('br'),
      h('button', { onClick: () => this.reset(), id: 'reset' }, ['Reset all fields']),
      h('button', { onClick: () => this.resetDates(), id: 'reset-dates' }, ['Reset dates']),
    ]

    return h('div', [
      formEl,
      otherEls,
    ])
  }
})

