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

export const ajaxFindSelectedShops = (context, { homeData, radius, allShops }) => {
  console.log('0. homeData = ', homeData)
  console.log('1.1 radius = ', radius)
  console.log('1.2 allShops = ', allShops)

  const key = constants.GEOCODER_SERVICE_KEY
  const encodedAddress = encodeURI(homeData.street + ' ' + homeData.streetNumber + ', ' + homeData.city)
  const url = constants.GEOCODER_SERVICE + encodedAddress + '&key=' + key + '&language=pl&pretty=1'
  //let homeGPSAndAddress = {}

  if (sessionStorage.getItem('homeGPSAndAddress')) {
    console.log('A. Tu homeGPSAndAddress = ', sessionStorage.getItem('homeGPSAndAddress'))

    shopsFiltering(JSON.parse(sessionStorage.getItem('homeGPSAndAddress')), radius, allShops)

  }
  else {
    console.log('4. Idę do axiosa ..')

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
          //radius: homeData.radius,
          city: homeData.city,
          street: homeData.street,
          streetNumber: homeData.streetNumber
        }


        console.log('5a. homeGPSAndAddress = ', homeGPSAndAddress)
        console.log('5b. radius = ', radius)

        sessionStorage.setItem('homeGPSAndAddress', JSON.stringify(homeGPSAndAddress))

        shopsFiltering(homeGPSAndAddress, radius, allShops)

      })
      .catch(err => console.log('My error: ', err))
  }

  function shopsFiltering(homeGPSAndAddress, radius, allShops) {
    console.log('5. homeGPSAndAddress = ', homeGPSAndAddress)
    console.log('6. radius= ', homeGPSAndAddress.radius)
    console.log('7. allShops = ', allShops)

    const shopsInRadius = filteredShops(homeGPSAndAddress, radius, allShops)

    console.log('shopsInRadius = ', shopsInRadius)

    context.commit('FIND_SELECTED_SHOPS', shopsInRadius)
    context.commit('SHOW_LOADER', false)
    context.commit('SHOW_TABLE', true)
  }


}

