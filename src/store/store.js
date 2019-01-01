import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
// import { getHomeGPS, getDistanceFromHome } from '../components/search/filterShops'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allShops: [],
    cityShops: [],
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
    getSelectedShops(state) {
      return state.selectedShops
    },
    getHomeGPS(state) {
      return state.homeGPS
    }
  },
  mutations: {
    addAllShops(state, payload) {
      state.allShops = payload
    },
    addCityShops(state) {
      //state.cityShops
    },
    findSelectedShops(state, shopsInRadius) {
      console.log('Tu mutations / findSelectedShops')
      console.log('shopsInRadius', shopsInRadius)
      //state.selectedShops = shopsInRadius
      // state.allShops = []
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
    addCityShops(context) {
      context.commit('addCityShops')
    },
    findSelectedShops(context, homeData) {
      console.log('Tu actions / findSelectedShops')
      console.log('homeData', homeData)

      const key = '224e8e01cf8f43a0aabb1b68341904a1'
      const encodedAddress = encodeURI(homeData.street + ' ' + homeData.streetNumber + ', ' + homeData.city)
      const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodedAddress + '&key=' + key + '&language=pl&pretty=1'

      axios.get(url)
        .then(res => {
          const homeGPS = {
            lat: res.data.results[0].geometry.lat,
            lon: res.data.results[0].geometry.lng,
            radius: this.radius
          }

          const shops = homeData.shops
          console.log('shops', shops)

          const shopsInRadius = filteredShops(shops, homeGPS) // todo: tu się wywala
          console.log('shopsInRadius', shopsInRadius)

          this.$store.dispatch('findSelectedShops', shopsInRadius)
      })
      .catch(err => console.log('Buont Search.vue / methods: search: ', err))




      context.commit('findSelectedShops', shopsInRadius)
    }
  }
})
