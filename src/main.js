import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store/store'
import { routes } from './routes'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

const vm = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

vm.$mount('#app')
