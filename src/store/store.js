import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddAllShops, ajaxFindSelectedShops } from '../services/ajax'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allShops: [],
    allShopsCopy: [],
    selectedShops: [],
    items:[],
    fields: [],
    stocksSelected: [],
    showCheckboxes: true
  },
  getters: {
    getAllShops(state) {
      return state.allShops
    },
    getAllShopsCopy(state) {
      return state.allShopsCopy
    },
    getItems(state) {
      return state.items
    },
    getStock(state) {
      return state.fields
    },
    getStocksSelected(state) {
      return state.stocksSelected
    },
    getShowCheckboxes(state) {
      return state.showCheckboxes
    }
  },
  mutations: {
    ADD_ALL_SHOPS(state, payload) {
      state.allShops = payload
      state.allShopsCopy = payload
    },
    FIND_SELECTED_SHOPS(state, shopsInRadius) {
      state.allShops = shopsInRadius
    },
    GET_STOCK(state, columns) {
      state.fields = columns.otherColumns.concat(columns.stocksSelected)
      state.stocksSelected = columns.stocksSelected
    },
    TOGGLE_CHECKBOXES(state) {
      state.showCheckboxes = !state.showCheckboxes
    }
  },
  actions: {
    addAllShops(context, payload) {
      ajaxAddAllShops(context, payload)
    },
    findSelectedShops(context, homeData) {
      ajaxFindSelectedShops(context, homeData)
    },
    getStock(context, stocksSelected) {
      const columns = { stocksSelected, otherColumns: ['shopName', 'address', 'total', 'google','jakd', 'gmaps'] }
      context.commit('GET_STOCK', columns)
    },
    addTotal(context, shopsWithTotal) {
      context.commit('ADD_ALL_SHOPS', shopsWithTotal)
    },
    toggleCheckboxes(context) {
      context.commit('TOGGLE_CHECKBOXES')
    }
  }
})
