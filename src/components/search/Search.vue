<template src="./Search.html"></template>

<script>
import axios from 'axios'

export default {
  template: 'Search',
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

       console.log('this.$store.getters.getAllShops.length', this.$store.getters.getAllShops.length);
       console.log('homeData', homeData);

         this.$store.dispatch('addAllShops')
         this.$store.dispatch('getFields')

         console.log('homeData', homeData)

       setTimeout(() => {
         this.$store.dispatch('findSelectedShops', homeData)
       }, 1000)
       /*
       */
    },
    reset() {
      console.log('reset')
      console.log('this.cities[0]', this.cities[0])

      this.city = this.cities[0].text
      this.street = ''
      this.streetNumber = ''
      this.radius = ''

      this.$store.dispatch('addAllShops')
      this.$store.dispatch('getFields')
    }
  }
}
</script>
