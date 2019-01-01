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
    findSelectedShops(context, shopsInRadius) {
      console.log('Tu actions / findSelectedShops')
      console.log('shopsInRadius', shopsInRadius);
      context.commit('findSelectedShops', shopsInRadius)
    }
  }
})
