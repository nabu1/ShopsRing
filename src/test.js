const axios = require('axios')
const fs = require('fs')
const fileSave = './zabki.json'
const _ = require('lodash')

// let from = 418  // 6227
// let to = 509    // 6228

function getZabka(from, to) {
  for (let index = from; index < to; index++) {  // do 6900
    console.log('index = ', index)
    const a = 'start'
    console.time(a)
    let times = Math.round(Math.random() * 3) + 1
    console.log('times = ', times)

    for (let i = times * 1e9; i > 0; i--)  { }  // pętla opóźniająca 3.6 sekundy
    console.timeEnd(a)

    let url = 'https://apkykk0pza-2.algolianet.com/1/indexes/prod_locator_prod_zabka/ID00' + index +
    '?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.22.1&x-algolia-application-id=APKYKK0PZA&x-algolia-api-key=71ca67cda813cec86431992e5e67ede2'

    axios.get(url)
      .then(res => {
        let shop = {
          id: res.data.id,
          shopName: 'Żabka',
          city: res.data.city,
          address: res.data.address,
          lat: res.data._geoloc.lat,
          lon: res.data._geoloc.lng
        }

        console.log(index, shop)
        fs.appendFileSync (fileSave, JSON.stringify(shop) + ',')
      })
      .catch(err => console.log('Buont: ', index))
  }
}

getZabka(1000, 1030)



