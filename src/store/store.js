import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { filteredShops } from '../components/search/filteredShops'
import { fields } from '../data/data'

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
    getCityShops(state) {
      return state.cityShops
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
    GET_FIELDS(state, fields) {
      state.fields = fields
    }
  },
  actions: {
    addAllShops(context) {
      axios
        .get('http://localhost:3000/biedry')
        .then(res => {
          context.commit('ADD_ALL_SHOPS', res.data)
        })
        .catch(err => console.log(err))
    },
    findSelectedShops(context, homeData) {
      const key = '224e8e01cf8f43a0aabb1b68341904a1'
      const encodedAddress = encodeURI(homeData.street + ' ' + homeData.streetNumber + ', ' + homeData.city)
      const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodedAddress + '&key=' + key + '&language=pl&pretty=1'

      axios.get(url)
        .then(res => {
          const homeGPS = {
            lat: res.data.results[0].geometry.lat,
            lon: res.data.results[0].geometry.lng,
            radius: homeData.radius
          }

        const shopsInRadius = filteredShops(homeData.shops, homeGPS)
        context.commit('FIND_SELECTED_SHOPS', shopsInRadius)
        })
        .catch(err => console.log('My error: ', err))
      },
      getFields(context, homeData) {
        context.commit('GET_FIELDS', fields)
      }
  }
})
