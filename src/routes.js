import Base from './components/Base/Base.vue'
import About from './components/About/About.vue'

export const routes = [
  { path: '', component: Base },
  { path: '/about', component: About },
  { path: '*', component: Base }
]
