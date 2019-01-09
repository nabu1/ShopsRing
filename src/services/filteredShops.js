export const filteredShops = (shops, homeGPSAndAddress) => {
  function distance(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180 }

    const R = 6371 // km
    const x1 = lat2 - lat1
    const dLat = toRad(x1)
    const x2 = lon2 - lon1
    const dLon = toRad(x2)

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c * 1000)
  }

  const shopsInRadius = shops.filter(el => {
    el.distance = distance(el.lat, el.lon, homeGPSAndAddress.lat, homeGPSAndAddress.lon)
    return el.distance < homeGPSAndAddress.radius
  })

  const shopsInRadiusWithJakD = shopsInRadius.map(el => {
     let link = 'https://jakdojade.pl/warszawa/trasa/?fn='
     link += encodeURI(homeGPSAndAddress.street + ' ' + homeGPSAndAddress.streetNumber) // from
     link += '&tn='
     link += encodeURI(el.address)   // to
     link += '&tc='
     link += el.lat + ':' + el.lon
     link += '&fc='
     link += homeGPSAndAddress.lat + ':' + homeGPSAndAddress.lon
     link += '&ft=LOCATION_TYPE_ADDRESS&tt=LOCATION_TYPE_ADDRESS&d='
     link += new Date().getDate() + '.' + (new Date().getMonth() + 1) +'.' + (new Date().getFullYear() - 2000)
     link += '&h='
     link += new Date().getHours() + ':' + new Date().getMinutes()
     link += '&aro=1&t=1&rc=3&ri=1&r=0&stopsLayer=true'

    el.jakd = `<a href=${link} target="_blank">jakDojade</a>`
    return el
  })

  const shopsInRadiusWithJakDAndGmaps = shopsInRadiusWithJakD.map(el => {
     let link = 'https://www.google.com/maps/dir/'
     link += encodeURI(homeGPSAndAddress.street + '+' + homeGPSAndAddress.streetNumber) // from
     link += '/'
     link += encodeURI(el.address + ' ' + el.city)   // to

    el.gmaps = `<a href=${link} target="_blank">GMaps</a>`

    return el
  })




  //console.log('shopsInRadiusWithJakD', shopsInRadiusWithJakD)

  // return shopsInRadiusWithJakD
  return shopsInRadiusWithJakDAndGmaps
}

