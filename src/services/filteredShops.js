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
    // todo: tu robię dorabianie linki do gmapsa i jakDojade

    // "<a href='http://jakdojade.pl/?fn=dworzec&tn=Wawel&tc=50.05434:19.93931&cid=5000'>JakD</a>",

    const to = `${el.address}, ${el.city}`
    const from = `${homeGPSAndAddress.street} ${homeGPSAndAddress.streetNumber}, ${homeGPSAndAddress.city}`

    console.log('from = ', from)
    console.log('to =', to)

    "<a href='http://jakdojade.pl/?fn=dworzec&tn=Wawel&tc=50.05434:19.93931&cid=5000'>JakD</a>",


    el.jakd = `<a href='http://jakdojade.pl/?fn=${from}&tn=${to}&cid=5000'>jakDojade</a>`

    return distance(el.lat, el.lon, homeGPSAndAddress.lat, homeGPSAndAddress.lon) < homeGPSAndAddress.radius



  })

  return shopsInRadius
}







