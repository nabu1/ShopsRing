import Hub from './components/Hub/Hub.vue'
import About from './components/About/About.vue'

export const routes = [
  { path: '', component: Hub },
  { path: '/about', component: About },
  { path: '*', component: Hub }
]
