import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { filteredShops } from '../components/search/filteredShops'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allShops: [],
    selectedShops: [],
    homeGPS: {}
  },
  getters: {
    getAllShops(state) {
      console.log('Tu getter "addAllShops"')
      return state.allShops || []
    },
    getCityShops(state) {
      return state.cityShops
    },
    getHomeGPS(state) {
      return state.homeGPS
    }
  },
  mutations: {
    ADD_ALL_SHOPS(state, payload) {
      console.log('Tu mutation "ADD_ALL_SHOPS"')
      state.allShops = payload
      // console.log('state.allShops = ', state.allShops)
    },
    FIND_SELECTED_SHOPS(state, shopsInRadius) {
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
          context.commit('ADD_ALL_SHOPS', res.data)
        })
        .catch(err => console.log(err))

      console.log('Tu action "addAllShops"')
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

          context.commit('FIND_SELECTED_SHOPS', shopsInRadius)
      })
      .catch(err => console.log('My error: ', err))
    }
  }
})
