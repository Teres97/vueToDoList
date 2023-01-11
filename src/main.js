import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI';
import directives from './directives';
import { createWebHistory, createRouter } from "vue-router"
import PageNotFound from '@/pages/PageNotFound';
import HomePage from '@/pages/HomePage'





const routes = [
    { path: '/', component: HomePage },
    { path: '/:pathMatch(.*)*', component: PageNotFound },
  ]
  
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})
app.use(router)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
