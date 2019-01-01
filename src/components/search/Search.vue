<template>
  <div>
    <h2>Shops nearby</h2>
    <b-container>
      <b-row class='my-4'>
        <b-col>
          <b-form-select v-model="city" :options="cities" class="mb-3" />
        </b-col>

        <b-col>
          <b-form-input v-model="street"
                        placeholder="Enter street">
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-input v-model="streetNumber"
                        placeholder="Enter street number">
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-input v-model.number="radius"
                        placeholder="Enter radius (meters)"
                        type="number"
                        min="100"
                        max="20000"
                        step="100">
          </b-form-input>
        </b-col>

        <button @click="search">Search</button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { filteredShops } from './filteredShops'

export default {

  data() {
    return {
      city: null,
      street:'',
      streetNumber: '',
      radius: 0,
      cities: [
        { text: 'Please select a city', value: null },
         { text: 'Warszawa',  value: 'warszawa'},
         { text: 'Kraków',  value: 'krakow' },
         { text: 'Gdańsk',  value: 'gdansk' }
      ]
    }
  },
  methods: {
    search() {
      const key = '224e8e01cf8f43a0aabb1b68341904a1'
      const encodedAddress = encodeURI(this.street + ' ' + this.streetNumber + ', ' + this.city)
      const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodedAddress + '&key=' + key + '&language=pl&pretty=1'

      axios.get(url)
        .then(res => {
          const homeGPS = {
            lat: res.data.results[0].geometry.lat,
            lon: res.data.results[0].geometry.lng,
            radius: this.radius
          }

          const shops = this.$store.getters.getAllShops
          console.log('shops', shops)

          const shopsInRadius = filteredShops(shops, homeGPS)
          console.log('shopsInRadius', shopsInRadius)

          this.$store.dispatch('findSelectedShops', shopsInRadius)
      })
      .catch(err => console.log('Buont Search.vue / methods: search: ', err))


    }
  }
}
</script>
