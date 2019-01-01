<template>
  <div>
    <h2>Shops nearby</h2>
    <b-container>
      <b-row class='my-4'>
        <b-col>
          <b-form-select v-model="selectedCity" :options="cities" class="mb-3" />
        </b-col>

        <b-col>
          <b-form-input v-model="street"
                        placeholder="Enter street">
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-input v-model="streetNumber"
                        placeholder="Enter street number"
                        type="number">
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-input v-model="radius"
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
export default {
  data() {
    return {
      selectedCity: null,
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
      const searchData = {
        selectedCity: this.selectedCity,
        street: this.street,
        streetNumber: this.streetNumber,
        radius: this.radius
      }

      console.log(searchData)

      this.$store.dispatch('findSelectedShops', searchData)
    }
  }
};
</script>
