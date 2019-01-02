import Vue from 'vue'
import Vuex from 'vuex'
import { fields } from '../data/data'
import { ajaxAddAllShops, ajaxFindSelectedShops } from '../services/ajax'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allShops: [],
    selectedShops: [],
    homeGPS: {},
    items:[],
    fields: []
  },
  getters: {
    getAllShops(state) {
      return state.allShops
    },
    getItems(state) {
      return state.items
    },
    getFields(state) {
      return state.fields
    },
    getHomeGPS(state) {
      return state.homeGPS
    }
  },
  mutations: {
    ADD_ALL_SHOPS(state, payload) {
      state.allShops = payload
    },
    FIND_SELECTED_SHOPS(state, shopsInRadius) {
      state.allShops = shopsInRadius
    },
    GET_FIELDS(state, selectedFields) {
      console.log('GET_FIELDS: selectedFields', selectedFields)
      state.fields = selectedFields
    }
  },
  actions: {
    addAllShops(context) {
      ajaxAddAllShops(context)
    },
    findSelectedShops(context, homeData) {
      ajaxFindSelectedShops(context, homeData)
    },
    getFields(context, stocksSelected) {
      const stocksSelectedFull = ['shopName', 'address', 'google','jakd', 'gmaps'].concat(stocksSelected)
      const selectedFields = fields.filter(el => {
        return stocksSelectedFull.includes(el.key)
      })
      context.commit('GET_FIELDS', selectedFields)
    }
  }
})
