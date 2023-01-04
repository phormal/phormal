import {defineComponent, h} from "vue";

export default defineComponent({
  name: 'CodeElement',

  props: {
    code: {
      type: Object,
      required: true,
    },
  },

  render() {
    return h(
      'code',
      [
        h('pre', { style: { backgroundColor: '#000', color: 'yellow', padding: '1em' }, id: 'code' }, [JSON.stringify(this.code)])
      ]
    )
  }
})