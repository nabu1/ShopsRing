import Vue from 'vue'
import Vuex from 'vuex'

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
    addAllShops(state) {
      state.allShops
    },
    addCityShops(state) {
      state.cityShops
    },
    addSeletedShops(state) {
      state.selectedShops
    }
  },
  actions: {
    addAllShops(context) {
      context.commit('addAllShops')
    },
    addCityShops(context) {
      context.commit('addCityShops')
    },
    addSelectedShops(context) {
      context.commit('addSelectedShops')
    }
  }
})
