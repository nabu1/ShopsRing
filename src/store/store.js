import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddAllShops, ajaxFindSelectedShops } from '../services/ajax'
import { initialColumns, totalColumn, stockColumns } from '../data/data'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allShops: [],
    allShopsCopy: [],
    selectedShops: [],
    items: [],
    fields: [],
    stocksSelected: [],
    showCheckboxes: true,
    showTable: false
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
    },
    getShowTable(state) {
      return state.showTable
    }
  },
  mutations: {
    ADD_ALL_SHOPS(state, allShops) {
      state.allShops = allShops
      state.allShopsCopy = allShops
    },
    FIND_SELECTED_SHOPS(state, shopsInRadius) {
      state.allShops = shopsInRadius
    },
    GET_STOCK(state, columns) {
      if (columns.stocksSelected.length) {
        state.fields =  initialColumns.concat(totalColumn).concat(columns.stocksSelected)
      }
      else {
        state.fields =  initialColumns.concat(columns.stocksSelected)
      }

      state.stocksSelected = columns.stocksSelected
    },
    TOGGLE_CHECKBOXES(state) {
      state.showCheckboxes = !state.showCheckboxes
    },
    SHOW_TABLE(state, bool) {
      state.fields = initialColumns
      state.showTable = bool
    }
  },
  actions: {
    addAllShops(context) {
      ajaxAddAllShops(context)
    },
    findSelectedShops(context, homeData) {
      ajaxFindSelectedShops(context, homeData)
    },
    getStock(context, stocksSelected) {
      context.commit('GET_STOCK', { initialColumns, stocksSelected })
    },
    addTotal(context, shopsWithTotal) {
      context.commit('ADD_ALL_SHOPS', shopsWithTotal)
    },
    toggleCheckboxes(context) {
      context.commit('TOGGLE_CHECKBOXES')
    },
    showTable(context, bool) {
      context.commit('SHOW_TABLE', bool)
    }
  }
})
