import axios from 'axios'
import { filteredShops } from './filteredShops'
import { constants } from '../data/constants'

export const ajaxAddAllShops = context => {

  if (sessionStorage.getItem('allShops')) {
    context.commit('ADD_ALL_SHOPS', JSON.parse(sessionStorage.getItem('allShops')))
    //return
  }
  else {
    axios
    .get(constants.SHOPS_LIST)
    .then(res => {
      context.commit('ADD_ALL_SHOPS', res.data)
      sessionStorage.setItem('allShops', JSON.stringify(res.data))
    })
    .catch(err => console.log(err))
  }
}

export const ajaxFindSelectedShops = (context, { homeData, radius, allShops }) => {
  const key = constants.GEOCODER_SERVICE_KEY
  const encodedAddress = encodeURI(homeData.street + ' ' + homeData.streetNumber + ', ' + homeData.city)
  const url = constants.GEOCODER_SERVICE + encodedAddress + '&key=' + key + '&language=pl&pretty=1'

  if (sessionStorage.getItem('homeGPSAndAddress')) {
    shopsFiltering(JSON.parse(sessionStorage.getItem('homeGPSAndAddress')), radius, allShops)
  }
  else {
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
          city: homeData.city,
          street: homeData.street,
          streetNumber: homeData.streetNumber
        }

        sessionStorage.setItem('homeGPSAndAddress', JSON.stringify(homeGPSAndAddress))
        shopsFiltering(homeGPSAndAddress, radius, allShops)

      })
      .catch(err => console.log('My error: ', err))
  }

  function shopsFiltering(homeGPSAndAddress, radius, allShops) {
    const shopsInRadius = filteredShops(homeGPSAndAddress, radius, allShops)

    context.commit('FIND_SELECTED_SHOPS', shopsInRadius)
    context.commit('SHOW_LOADER', false)
    context.commit('SHOW_TABLE', true)
  }
}

