import App from '../src/App.vue'
import About from './components/About/About.vue'

export const routes = [
  { path: '', component: App },
  { path: '/about', component: About },
  { path: '*', component: App }
]
