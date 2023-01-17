import {defineComponent, h} from "vue";

export default defineComponent({
  name: "ReactTestsInitializer",

  mounted() {
    this.showReactApp()
  },

  methods: {
    showReactApp() {
      const reactApp = document.getElementById('app-react')

      if (reactApp instanceof HTMLElement) {
        console.log('hello')
        reactApp.style.display = 'block'
      }
    }
  },

  render() {
    return h("div",[
      // h('button', { onClick: this.showReactApp, id: 'show-react-button' }, 'Show React App'),
    ])
  }
})
