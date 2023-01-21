import { createApp } from 'vue'
import './style.scss'
import {createRouter, createWebHashHistory} from 'vue-router'
import Dev from './Dev.vue'
import App from './App.vue'
import Smoke from '../tests/pages/Smoke'
import FieldConditions from '../tests/pages/FieldConditions'
import Validation from '../tests/pages/Validation'
import Vue3Component from '../tests/pages/Vue3Component.vue'
import MultiSelect from '../tests/pages/MultiSelect'
import Errors from "../tests/pages/Errors";
import RadioGroupTests from "../tests/pages/RadioGroupTests";
import EventHandlerTests from "../tests/pages/EventHandlerTests";
import CheckboxTests from "../tests/pages/CheckboxTests";
import RightToLeftTests from "../tests/pages/RightToLeft";
import ReactTestsInitializer from "../tests/pages/ReactTestsInitializer";
import DestroyInstanceTest from "../tests/pages/DestroyInstanceTest";

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Dev },
    { path: '/e2e/smoke', component: Smoke },
    { path: '/e2e/field-conditions', component: FieldConditions },
    { path: '/e2e/validation', component: Validation },
    { path: '/e2e/component-vue3', component: Vue3Component },
    { path: '/e2e/multiselect', component: MultiSelect },
    { path: '/e2e/errors', component: Errors },
    { path: '/e2e/radiogroup', component: RadioGroupTests },
    { path: '/e2e/event-handlers', component: EventHandlerTests },
    { path: '/e2e/checkbox', component: CheckboxTests },
    { path: '/e2e/right-to-left', component: RightToLeftTests },
    { path: '/e2e/react', component: ReactTestsInitializer },
    { path: '/e2e/destroy-instance', component: DestroyInstanceTest },
  ]
})

app.use(router)

app.mount('#app')
