import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { filteredShops } from '../components/search/filteredShops'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allShops: [],
    selectedShops: [],
    homeGPS: {},
    items:[],
    fields: [
      /*
      'index',
      {
        key: "shopName",
        label: "Sklep",
        sortable: true
      },
      {
        key: "address",
        label: "Adres",
        sortable: true
      },
      {
        key: "google",
        label: "Google"
      },
      {
        key: "jakd",
        label: "JakD"
      },
      {
        key: "gmaps",
        label: "Gmaps"
      },
      {
        key: "total",
        label: "Total",
        sortable: true,
        variant: 'warning'
      },
      {
        key: "chleb",
        label: "Chleb",
        sortable: true
      },
      {
        key: "maslo",
        label: "Masło",
        sortable: true
      },
      {
        key: "ser",
        label: "Ser",
        sortable: true
      },
      {
        key: "jajko",
        label: "Jajko",
        sortable: true
      },
      {
        key: "szynka",
        label: "Szynka",
        sortable: true
      },
      {
        key: "kielbasa",
        label: "Kiełbasa",
        sortable: true
      },
      {
        key: "cukier",
        label: "Cukier",
        sortable: true
      },
      {
        key: "mleko",
        label: "Mleko",
        sortable: true
      },
      {
        key: "smietana",
        label: "Śmietana",
        sortable: true
      },
      {
        key: "mineralna",
        label: "Mineralna",
        sortable: true
      },
      {
        key: "niematego",
        sortable: true
      }
      */
    ]
  },
  getters: {
    getAllShops(state) {
      //console.log('Tu getter "addAllShops"')
      return state.allShops
    },
    getItems(state) {
      //console.log('Tu getter "addAllShops"')
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
      //console.log('Tu mutation "ADD_ALL_SHOPS"')
      state.allShops = payload
      // console.log('state.allShops = ', state.allShops)
    },
    FIND_SELECTED_SHOPS(state, shopsInRadius) {
      //console.log('Tu mutations: findSelectedShops')
      //console.log('shopsInRadius', shopsInRadius)
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

      //console.log('Tu action "addAllShops"')
    },
    findSelectedShops(context, homeData) {
      console.log('Tu: actions / findSelectedShops')

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
          console.log('shopsInRadius', shopsInRadius)

          context.commit('FIND_SELECTED_SHOPS', shopsInRadius)
        })
        .catch(err => console.log('My error: ', err))
      },
      getFields(context, homeData) {
        const fields = [
          'index',
            {
              key: "shopName",
              label: "Sklepiszcze",
              sortable: true
            },
            {
              key: "address",
              label: "Adres",
              sortable: true
            },
            {
              key: "google",
              label: "Google"
            },
            {
              key: "jakd",
              label: "JakD"
            },
            {
              key: "gmaps",
              label: "Gmaps"
            },
            {
              key: "total",
              label: "Total",
              sortable: true,
              variant: 'warning'
            },
            {
              key: "chleb",
              label: "Chleb",
              sortable: true
            },
            {
              key: "maslo",
              label: "Masło",
              sortable: true
            },
            {
              key: "ser",
              label: "Ser",
              sortable: true
            },
            {
              key: "jajko",
              label: "Jajko",
              sortable: true
            },
            {
              key: "szynka",
              label: "Szynka",
              sortable: true
            },
            {
              key: "kielbasa",
              label: "Kiełbasa",
              sortable: true
            },
            {
              key: "cukier",
              label: "Cukier",
              sortable: true
            },
            {
              key: "mleko",
              label: "Mleko",
              sortable: true
            },
            {
              key: "smietana",
              label: "Śmietana",
              sortable: true
            },
            {
              key: "mineralna",
              label: "Mineralna",
              sortable: true
            },
            {
              key: "niematego",
              sortable: true
            }
          ]
        context.commit('GET_FIELDS', fields)
      }
  }
})
