import axios from 'axios'
import { filteredShops } from './filteredShops'

export const ajaxAddAllShops = context => {
  axios
  .get('http://localhost:3000/biedry')
  .then(res => {
    context.commit('ADD_ALL_SHOPS', res.data)
  })
  .catch(err => console.log(err))
}

export const ajaxFindSelectedShops = (context, homeData) => {
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

}

export const calcTotal = (context, payload) => {

}
