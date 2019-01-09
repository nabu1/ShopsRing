<template src="./Search.html"></template>

<script>
import axios from 'axios'

export default {
  template: 'Search',
  data() {
    return {
      city: null,
      street: '',
      streetNumber: '',
      radius: 500,
      cities: [
        { text: 'Miasto', value: null },
        { text: 'Warszawa',  value: 'warszawa'},
        { text: 'Kraków',  value: 'krakow' },
        { text: 'Gdańsk',  value: 'gdansk' }
      ],
      showAlert: false
    }
  },
  methods: {
    search() {
      if(!this.city) {
        console.log('city = ', this.city)
        this.$refs.modalCity.show()
        return
      }

      if(!this.street) {
        console.log('street = ', this.street)
        this.$refs.modalStreet.show()
        return
      }

      const  homeData = {
        city: this.city,
        street: this.street,
        streetNumber: this.streetNumber,
        radius: this.radius,
        shops: this.$store.getters.getAllShopsCopy
      }

      console.log('this.radius = ', this.radius)
      // console.log('typeof radius = ', typeof this.radius.value)


      this.$store.dispatch('findSelectedShops', homeData)
      this.$store.dispatch('showTable', true )
      this.$store.dispatch('getStock', this.$store.getters.getStocksSelected)
    },
    hideModalCity () {
        this.$refs.modalCity.hide()
    },
    hideModalStreet () {
        this.$refs.modalStreet.hide()
    },
    reset() {
      this.city = this.cities[0].text
      this.street = ''
      this.streetNumber = ''
      this.radius = ''

      this.$store.dispatch('toggleCheckboxes')
      this.$store.dispatch('showTable', false )
      //this.$store.dispatch('addAllShops')
    }
  }
}
</script>
