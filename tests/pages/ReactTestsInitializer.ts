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
        reactApp.style.display = 'block'
      }
    }
  },

  render() {
    return h("div")
  }
})
