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
      state.allShops = payload
    },
    addCityShops(state) {
      state.cityShops
    },
    findSelectedShops(state, searchData) {
      console.log('Tu mutations / findSelectedShops')
      console.log(state.allShops)
      state.allShops.filter(el => {
        //console.log(el.address)
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
    findSelectedShops(context, searchData) {
      console.log('Tu actions / findSelectedShops')
      context.commit('findSelectedShops', searchData)
    }
  }
})
