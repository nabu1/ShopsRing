<template src="./Search.html"></template>

<script>

export default {
  data() {
    return {
      city: '',
      street: '',
      streetNumber: '',
      radius: 500,
      cities: [
        { text: 'Warszawa', value: 'warszawa' },
        { text: 'Kraków', value: 'krakow' },
        { text: 'Gdańsk', value: 'gdansk' },
      ],
      showAlert: false
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    search() {
      if (!this.city) {
        return this.$refs.modalCity.show()
      }
      if (!this.street) {
        return this.$refs.modalStreet.show()
      }
      if (!this.radius) {
        return this.$refs.modalRadius.show()
      }

      this.$store.dispatch('addAllShops')

      const homeData = {
        city: this.city,
        street: this.street,
        streetNumber: this.streetNumber
      }

      const radius = this.radius
      const allShops = this.$store.getters.getAllShops
      const selectedStocks = this.$store.getters.getStocksSelected

      this.$store.dispatch('findSelectedShops', { homeData, radius, allShops })
      this.$store.dispatch('showLoader', true)
      this.$store.dispatch('getStock', selectedStocks)

      const selectedShops = this.$store.getters.getSelectedShops
      this.$store.dispatch('addTotal', selectedShops)
    },
    template: 'Search',
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
    }
  }
}
</script>

