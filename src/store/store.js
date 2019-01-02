import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import createPersistedState from 'vuex-persistedstate'
import { filteredShops } from '../components/search/filteredShops'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allShops: [],
    selectedShops: [],
    homeGPS: {}
  },
  plugins: [createPersistedState()],
  getters: {
    getAllShops(state) {
      return state.allShops
    },
    getCityShops(state) {
      return state.cityShops
    },
    getHomeGPS(state) {
      return state.homeGPS
    }
  },
  mutations: {
    addAllShops(state, payload) {
      state.allShops = payload
    },
    findSelectedShops(state, shopsInRadius) {
      console.log('Tu mutations: findSelectedShops')
      console.log('shopsInRadius', shopsInRadius)
      state.allShops = shopsInRadius
    }
  },
  actions: {
    addAllShops(context) {
      axios
      .get('http://localhost:3000/biedry')
      .then(res => {
        context.commit('addAllShops', res.data)
      })
      .catch(err => console.log(err))
    },
    findSelectedShops(context, homeData) {
      console.log('Tu: actions / findSelectedShops')

      const key = '224e8e01cf8f43a0aabb1b68341904a1'
      const encodedAddress = encodeURI(homeData.street + ' ' + homeData.streetNumber + ', ' + homeData.city)
      const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodedAddress + '&key=' + key + '&language=pl&pretty=1'

      axios.get(url)
        .then(res => {
          const homeGPS = {
            lat: res.data.results[0].geometry.lat,
            lon: res.data.results[0].geometry.lng,
            radius: homeData.radius
          }

          const shopsInRadius = filteredShops(homeData.shops, homeGPS)
          console.log('shopsInRadius', shopsInRadius)

          context.commit('findSelectedShops', shopsInRadius)
      })
      .catch(err => console.log('My error: ', err))
    }
  }
})
