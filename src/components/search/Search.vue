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
        shops: this.$store.getters.getAllShopsCopy
      }

      // console.log('homeData', homeData)

      this.$store.dispatch('findSelectedShops', homeData)
    },
    //async reset() {
    reset() {
      this.city = this.cities[0].text
      this.street = ''
      this.streetNumber = ''
      this.radius = ''

      this.$store.dispatch('toggleCheckboxes')
      this.$store.dispatch('addAllShops')
    }
  }
}
</script>
