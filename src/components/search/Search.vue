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
                        placeholder="Street">
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-input v-model="streetNumber"
                        placeholder="Street number">
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-input v-model.number="radius"
                        placeholder="Radius (meters)"
                        type="number"
                        min="100"
                        max="20000"
                        step="100">
          </b-form-input>
        </b-col>

        <b-col>
          <b-button @click="search" size="md">Search</b-button>
        </b-col>

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
        { text: 'City', value: null },
         { text: 'Warszawa',  value: 'warszawa'},
         { text: 'Kraków',  value: 'krakow' },
         { text: 'Gdańsk',  value: 'gdansk' }
      ]
    }
  },
  methods: {
    search() {
       const homeData = {
         city: this.city,
         street: this.street,
         streetNumber: this.streetNumber,
         radius: this.radius,
         shops: this.$store.getters.getAllShops
       }

       this.$store.dispatch('findSelectedShops', homeData)
    }
  }
}
</script>
