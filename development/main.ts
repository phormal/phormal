import { createApp } from 'vue'
import './style.scss'
import {createRouter, createWebHashHistory} from 'vue-router'
import Dev from './Dev.vue'
import App from './App.vue'
import Smoke from '../cypress/pages/Smoke.vue'
import FieldConditions from '../cypress/pages/FieldConditions.vue'
import Validation from '../cypress/pages/Validation.vue'
import Vue3Component from '../cypress/pages/Vue3Component.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Dev },
    { path: '/e2e/smoke', component: Smoke },
    { path: '/e2e/field-conditions', component: FieldConditions },
    { path: '/e2e/validation', component: Validation },
    { path: '/e2e/component-vue3', component: Vue3Component },
  ]
})

app.use(router)

app.mount('#app')
