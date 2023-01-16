import {defineComponent, h} from "vue";
import {Phormal, useLength} from "../../packages/core/src";
import CodeElement from "../components/code-element";

export default defineComponent({
  name: "RightToLeftTests",

  data() {
    return {
      form: undefined as undefined|Phormal,

      formFields: {
        firstName: {
          label: 'نام کوچک',
          placeholder: 'نام کوچک خود را وارد کنید',
          hooks: [useLength(10)],
          // disabled: true,
        },
        newsletter: {
          label: 'خبرنامه',
          type: 'checkbox',
          // disabled: true,
          // value: true
        },
        country: {
          label: 'کشور',
          type: 'select',
          options: [
            {value: 'us', label: 'آمریکا'},
            {value: 'ca', label: 'کانادا'},
            {value: 'mx', label: 'مکزیک'},
            {value: 'br', label: 'برزیل'},
            {value: 'ar', label: 'آرژانتین'},
            {value: 'cl', label: 'شیلی'},
          ],
        },
        paymentMethod: {
          label: 'روش پرداخت',
          type: 'radiogroup',
          options: [
            {value: 'cc', label: 'کارت اعتباری'},
            {value: 'pp', label: 'پی پال'},
            {value: 'bt', label: 'بانک تجارت'},
          ]
        }
      },

      formValues: {} as Record<string, any>|undefined,
    }
  },

  mounted() {
    const url = window.location.href
    const themeQueryString = url.match(/theme=(\w+)/)

    const theme = !themeQueryString || !themeQueryString.length
      ? 'basic'
      : (themeQueryString[0].split('=')[1]) as 'basic' | 'material'

    this.form = new Phormal(this.formFields, { el: '#phormal', theme, language: 'fa', fallbackLanguage: 'de' })
  },

  render() {
    const phormal = h('div', { id: 'phormal' })

    return h("div", { dir: 'rtl', style: 'max-width: 90%; margin: 20px auto;' }, [
      phormal,
      h(CodeElement, { code: this.formValues || {} }),
      h('button', { onClick: () => this.formValues = this.form?.$values(), id: 'getvalues' }, 'Get Values')
    ])
  }
})
