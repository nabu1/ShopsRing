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
      state.cityShops
    },
    findSelectedShops(state, homeGPS) {
      console.log('Tu mutations / findSelectedShops = ', homeGPS)
      state.homeGPS = homeGPS

      function distance(lat1, lon1, lat2, lon2) {

        function toRad(x) { return x * Math.PI / 180 }

        const R = 6371 // km

          let x1 = lat2 - lat1
          let dLat = toRad(x1)
          let x2 = lon2 - lon1
          let dLon = toRad(x2)

          let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)

            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            return Math.round(R * c * 1000)
      }

      //console.log(distance(52.1928623, 21.0238631, 52.5271, 21.1599))   // Dolna - Popowo = 37.270557460577145 km
      //console.log(distance(52.1928623, 21.0238631, 52.1698814, 21.0312037))   // Dolna - Bacha      =  3.41 km
      //console.log('state.allShops', state.allShops);


      const shopsInRadius = state.allShops.filter(el => {
        //console.log(el.address + ': ' + distance(el.lat, el.lon, state.homeGPS.lat, state.homeGPS.lon))
        return distance(el.lat, el.lon, state.homeGPS.lat, state.homeGPS.lon) < state.homeGPS.radius
      })

      console.log('shopsInRadius', shopsInRadius)

    }
  },
  actions: {
    addAllShops(context, payload) {
      context.commit('addAllShops', payload)
    },
    addCityShops(context) {
      context.commit('addCityShops')
    },
    findSelectedShops(context, homeGPS) {
      // console.log('Tu actions / findSelectedShops')
      context.commit('findSelectedShops', homeGPS)
    }
  }
})
