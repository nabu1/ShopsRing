<template>
  <div>
    <h2>Shops nearby</h2>
    <b-container>
      <b-row class='my-4'>
        <b-col>
          <b-form-select v-model="selected" :options="cities" class="mb-3" />
        </b-col>

        <b-col>
          <b-form-input v-model="street"
                        placeholder="Enter street">
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-input v-model="streetNumber"
                        placeholder="street number"
                        type="number">
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-input v-model="radius"
                        placeholder="radius in meters"
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
      selected: null,
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
      console.log("Tu metoda search()");
    }
  }
};
</script>
