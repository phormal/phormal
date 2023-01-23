import {defineComponent, h} from "vue";

export default defineComponent({
  name: 'CodeElement',

  props: {
    code: {
      required: true,
    },
  },

  render() {
    return h(
      'code',
      {id: 'code-element'},
      [
        h('pre', { style: { backgroundColor: '#000', color: 'yellow', padding: '1em' }, id: 'code' }, [JSON.stringify(this.code, null, 2)])
      ]
    )
  }
})
