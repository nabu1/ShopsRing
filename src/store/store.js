import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allShops: [],
    cityShops: [],
    selectedShops: []
  },
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

  },
  mutations: {
    addAllShops(state, payload) {
      console.log('4. Tu mutations: payload = ', payload)
      state.allShops = payload
    },
    addCityShops(state) {
      state.cityShops
    },
    addSeletedShops(state) {
      state.selectedShops
    }
  },
  actions: {
    addAllShops(context, payload) {
      console.log('3. Tu actions: payload = ', payload)
      context.commit('addAllShops', payload)
    },
    addCityShops(context) {
      context.commit('addCityShops')
    },
    addSelectedShops(context) {
      context.commit('addSelectedShops')
    }
  }
})
