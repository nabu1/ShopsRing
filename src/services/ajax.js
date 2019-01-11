import axios from 'axios'
import { filteredShops } from './filteredShops'
import { constants } from '../data/constants'

export const ajaxAddAllShops = context => {
  axios
    .get(constants.SHOPS_LIST)
    .then(res => {
      context.commit('ADD_ALL_SHOPS', res.data)
    })
    .catch(err => console.log(err))
}

export const ajaxFindSelectedShops = (context, homeData) => {
  const key = constants.GEOCODER_SERVICE_KEY
  const encodedAddress = encodeURI(homeData.street + ' ' + homeData.streetNumber + ', ' + homeData.city)
  const url = constants.GEOCODER_SERVICE + encodedAddress + '&key=' + key + '&language=pl&pretty=1'



  axios.get(url)
    .then(res => {
      if (res.data.results[0].confidence < 9) {
        alert('Nie ma takiej ulicy. Spróbuj jeszcze raz')
        context.commit('FIND_SELECTED_SHOPS', [])
        return
      }

      const homeGPSAndAddress = {
        lat: res.data.results[0].geometry.lat,
        lon: res.data.results[0].geometry.lng,
        radius: homeData.radius,
        city: homeData.city,
        street: homeData.street,
        streetNumber: homeData.streetNumber
      }

      const shopsInRadius = filteredShops(homeData.shops, homeGPSAndAddress)

      console.log('shopsInRadius = ', shopsInRadius)

      context.commit('FIND_SELECTED_SHOPS', shopsInRadius)
      context.commit('SHOW_LOADER', false)
      context.commit('SHOW_TABLE', true)

      //this.$store.dispatch('showTable', true);
      //this.$store.dispatch('getStock', this.$store.getters.getStocksSelected);

    })
    .catch(err => console.log('My error: ', err))

}

