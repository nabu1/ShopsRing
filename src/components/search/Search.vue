<template src="./Search.html"></template>

<script>
import axios from "axios";

export default {
  template: "Search",
  data() {
    return {
      city: '',
      street: '',
      streetNumber: '',
      radius: 500,
      cities: [
        { text: "Warszawa", value: "warszawa" },
        { text: "Kraków", value: "krakow" },
        { text: "Gdańsk", value: "gdansk" }
      ],
      showAlert: false
    };
  },
  methods: {
    search() {
      if (!this.city) {
        this.$refs.modalCity.show()
        return
      }

      if (!this.street) {
        this.$refs.modalStreet.show()
        return
      }

      if (!this.radius) {
        this.$refs.modalRadius.show()
        return
      }

      const homeData = {
        city: this.city,
        street: this.street,
        streetNumber: this.streetNumber,
        radius: this.radius,
        shops: this.$store.getters.getAllShopsCopy
      }

      this.$store.dispatch("findSelectedShops", homeData)
      this.$store.dispatch("showTable", true)
      this.$store.dispatch("getStock", this.$store.getters.getStocksSelected)
    },
    hideModalCity() {
      this.$refs.modalCity.hide()
    },
    hideModalStreet() {
      this.$refs.modalStreet.hide()
    },
    hideModalRadius() {
      this.$refs.modalRadius.hide()
    },
    reset() {
      this.city = ''
      this.street = ''
      this.streetNumber = ''
      this.radius = 500

      this.$store.dispatch('toggleCheckboxes')
      this.$store.dispatch('showTable', false)
      //this.$store.dispatch('addAllShops')
    }
  }
}
</script>
