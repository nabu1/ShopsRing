/*
Apka koszyk ma wyświetlać sklepy w zadanym promieniu od zadanego miejsca zamieszkania
Podaje się miasto, ulice, nr domu i odległość w setkach metrów
Dostaje się tabelę sklepów z ceną do 20 wybranych towarów i ich sumą
Prócz tego linka do jakdojade i gugiel mapy z markerami

Lista sklepów ściągana jest juz po wybraniu nazwy miasta
Dalsze filtrowanie więc odbywa się we frontendzie

Niniejszy plik obrabia plik z danymi adresowymi sklepów
przeklejonymi ręcznie z overpass-turno.eu

Tamtejszą mapę ustaw na Wwę, wciśnij batona Kreator: 'biedronka'
i skopiuj zawartość taba 'Dane' do pliku sklepyZOverpass.json
Problem: niektórym obiektom brakuje ulicy lub nr domu
Poniższa pik - geocoder.js ten brak uzupełnia

Instrukcja obsługi niniejszego pliku:
1. Skopiowane z overpass-turbo jsony wklej do shopsFromOverpass.json
2. Wypełnij pola const city i const shopName
3. Odpal tylko filteredShops() i sprawdź shopsFiltered.json
4. Odpal tylko fillGaps() i sprawdź shopsFinal.json

Formatowanie JSONów: ctrl + shift + f
*/


const fs = require('fs')
const _ = require('lodash')
const axios = require('axios')

const fileBiedryZOverpass = './biedryZOverpass.json'
const city = 'Warszawa'
const shopName = 'Biedronka'

const key = '224e8e01cf8f43a0aabb1b68341904a1'
const fileShopsFromOverpass = './shopsFromOverpass.json'
const fileShopsFiltered = './shopsFiltered.json'
const fileShopsFinal = './shopsFinal.json'
const fileShopsFinalId = './shopsFinalId.json'

// Losowe ceny produktów dopisywane do każdego sklepu
const prices = () => {
  const obj = {}

  obj.chleb = _.random(410, 710) / 100
  obj.maslo = _.random(310, 610) / 100
  obj.ser = _.random(2100, 4100) / 100
  obj.jajko = _.random(50, 100) / 100
  obj.szynka = _.random(2510, 4010) / 100
  obj.kielbasa = _.random(1210, 2010) / 100
  obj.cukier = _.random(310, 610) / 100
  obj.mleko = _.random(210, 510) / 100
  obj.smietana = _.random(310, 610) / 100
  obj.mineralna = _.random(75, 100) / 100

  const total = Object.values(obj).reduce((previous, item) => {
    return previous + item
  }, 0)

  obj.total = total.toFixed(2)

  return obj
}

// Na podstawie lat i lon, znajdowany jest adres i całość zapisywana w gotoweSklepyBezAdresu.json
function getAddress(lat = 52.2472828, lon = 21.0568093) {
  const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + '+' + lon + '&key='+ key

  //console.log('url', url)
  //debugger;


  axios.get(url)
    .then(res => {
      let obj = {
        shopName,
        city,
        address: res.data.results[0].formatted,
        lat,
        lon,
      }

      let fullObj = Object.assign({}, obj, prices())
      //console.log('obj', obj)
      //console.log('fullObj', fullObj)

      fs.appendFileSync (fileShopsFinal, JSON.stringify(fullObj) + ',')
    })
    .catch(err => console.log('Buont getAddress: ', err))

}


  // Na podstawie adresu, znajdowany jest lat i lon, a całość zapisywana jest w gotoweSklepyZGPS.json
  function getGPS(address, city) {
    const encodedAdres = encodeURI(address + ', ' + city)
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodedAdres + '&key=' + key + '&language=pl&pretty=1'

    axios.get(url)
    .then(res => {
      let obj = {
        shopName,
        city,
        address,
        lat: res.data.results[0].geometry.lat,
        lon: res.data.results[0].geometry.lng,
      }

      let fullObj = Object.assign({}, obj, prices())
      //console.log('fullObj', fullObj)

      fs.appendFileSync (fileShopsFinal, JSON.stringify(fullObj) + ',')
    })
    .catch(err => console.log('Buont getGPS: ', err))
  }

// Obiekt jest okrajany do zawartości: lat, lon, street, housenumber
function filteredShops() {
  let obj = {}
  let arr = []
  const shopsFromOverpass = fs.readFileSync(fileShopsFromOverpass,'utf8')
  const shopsFromOverpassObj = JSON.parse(shopsFromOverpass)

  shopsFromOverpassObj.map((el) => {
    el.lat ? obj.lat = el.lat : null
    el.lon ? obj.lon = el.lon : null

    if(el.tags && el.tags['addr:street'] && el.tags['addr:housenumber']) {
      obj.address = el.tags['addr:street'] + ' ' + el.tags['addr:housenumber']
    }

    if (Object.keys(obj).length !== 0) {
      obj.shopName = shopName
      obj.city = city
      arr.push(obj)
    }

    obj = {}
  })

  const shopsList = JSON.stringify(arr)
  fs.writeFileSync (fileShopsFiltered, shopsList)
  //return shopsList
}

// Uzupełaniane jest brak adresu lub gps'ów
function fillGaps() {
  const shopsFiltered = fs.readFileSync(fileShopsFiltered,'utf8')
  const shopsFilteredObj = JSON.parse(shopsFiltered)

  shopsFilteredObj.map(el => {
    if(Object.keys(el).length === 0) { } // jeśli pusty obiekt, biorę nastepny

    else if(!el.lat || !el.lon) {   // ide do getGPS
      getGPS(el.address, el.city)
    }

    else if(!el.address) {   // ide do getAddress
      getAddress(el.lat, el.lon)
    }

    else {
      let obj = {
        shopName,
        city,
        address: el.address,
        lat: el.lat,
        lon: el.lon
      }

      let fullObj = Object.assign({}, obj, prices())
      console.log('fullObj', fullObj)

      fs.appendFileSync (fileShopsFinal, JSON.stringify(fullObj) + ',')
    }
  })
}

function addId() {
  const shopsFinal = fs.readFileSync(fileShopsFinal,'utf8')
  const shopsFinalObj = JSON.parse(shopsFinal)

  console.log('183. shopsFinalObj = ', shopsFinalObj)

  const shopsFinalId = shopsFinalObj.map((el, index) => {
    el.id = index
    return el
  })

  console.log('187. shopsFinalId', shopsFinalId)

  fs.appendFileSync (fileShopsFinalId, JSON.stringify(shopsFinalId))

}

//console.log(filteredShops())  // odpal najpierw ten, komentując kolejny
//filteredShops()  // odpal najpierw ten, komentując kolejny
//fillGaps()
//getAddress()

addId()
