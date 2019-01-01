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

      state.allShops.filter(el => {
        console.log(el.address, el.lat, el.lon)
      })
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
