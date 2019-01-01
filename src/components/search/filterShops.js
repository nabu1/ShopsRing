import axios from 'axios'

export const getHomeGPS = ({city, street, streetNumber}) => {
  const key = '224e8e01cf8f43a0aabb1b68341904a1'
  const encodedAddress = encodeURI(street + ' ' + streetNumber + ', ' + city)
  const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodedAddress + '&key=' + key + '&language=pl&pretty=1'

  axios.get(url)
    .then(res => {
      console.log('res.data = ', res.data.results[0].formatted)
      let obj = {
        lat: res.data.results[0].geometry.lat,
        lon: res.data.results[0].geometry.lng
      }

      //console.log(Object.assign({}, obj))
      return Object.assign({}, obj)
  })
  .catch(err => console.log('Buont getGPS: ', err))
}


export function getDistanceFromHome(shopsList, homeLat, homeLon, radius) {
  return 'Tu getDistanceFromHome() '
}



//module.exports.getHomeGPS = getHomeGPS
// module.exports.getDistanceFromHome = getDistanceFromHome

