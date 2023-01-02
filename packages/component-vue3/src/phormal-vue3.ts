import {defineComponent, h, PropType} from "vue";
import FormConfig, {FormFieldConfig} from "@phormal/core/src/types/interfaces/FormConfig.interface";
import {Phormal} from "@phormal/core/src";

type AdjustedConfig = Omit<FormConfig, 'el'>

export default defineComponent ({
  name: "Phormal",

  props: {
    config: {
      type: Object as PropType<AdjustedConfig>,
      required: true,
    },
    fields: {
      type: Object as PropType<Record<string, FormFieldConfig>>,
      required: true,
    }
  },

  data() {
    return {
      form: null as Phormal | null,

      formConfig: {
        ...this.config,
        el: '#phlib__phormal-wrapper',
      }
    }
  },

  mounted() {
    this.form = new Phormal(this.fields, this.formConfig)
  },

  methods: {
    /**
     * Run all validators on all fields
     * */
    $validate() {
      return this.form?.$validate()
    },

    /**
     * Get the values of all fields
     * */
    $values() {
      return this.form?.$values()
    }
  },

  render() {
    return h('div', { id: 'phlib__phormal-wrapper' })
  },
})