import { createApp } from 'vue'
import './style.scss'
import {createRouter, createWebHashHistory} from 'vue-router'
import Dev from './Dev.vue'
import App from './App.vue'
import Smoke from '../cypress/pages/Smoke.vue'
import DisablingFields from "../cypress/pages/DisablingFields.vue";

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Dev },
    { path: '/e2e/smoke', component: Smoke },
    { path: '/e2e/disabling-fields', component: DisablingFields },
  ]
})

app.use(router)

app.mount('#app')
