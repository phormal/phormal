import {Phormal} from '../../packages/core/src'
import {defineComponent, h} from "vue";

export default defineComponent({
  name: 'Errors',

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        firstName: {
          label: 'First name',
        }
      },

      config: {
        el: '#phormal',
        theme: 'basic'
      }
    }
  },

  mounted() {
    const url = window.location.href
    const errorMatches = url.match(/error=(\w+)/)
    if (!errorMatches || !errorMatches.length) return

    const error = errorMatches[0].split('=')[1]

    if (error === 'elnotconfigured') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.form = new Phormal(this.formFields, { theme: 'basic' })
    }

    if (error === 'elnoexist') {
      return this.form = new Phormal(this.formFields, { theme: 'basic', el: '#xxxxx' })
    }

    if (error === 'elinvalidselector') {
      return this.form = new Phormal(this.formFields, { theme: 'basic', el: 'xxxxx' })
    }

    if (error === 'validationinvalid') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.form = new Phormal(this.formFields, { validation: 'foo', el: '#phormal' })
    }

    if (error === 'themeinvalid') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.form = new Phormal(this.formFields, { theme: 'foo', el: '#phormal' })
    }

    if (error === 'reservedfieldname') {
      return this.form = new Phormal({ _init: { label: 'Init' } }, { el: '#phormal' })
    }

    if (error === 'fieldtypeinvalid') {
      const formFields = {
        foo: { label: 'Foo', type: 'foo' },
        bar: { label: 'Bar', type: 'number' },
      }

      return this.form = new Phormal(formFields, { el: '#phormal' })
    }
  },

  render() {
    return h('div', { id: 'phormal' })
  }
})
