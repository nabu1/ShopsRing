<template src='./Search.html'></template>

<script>
import axios from 'axios'

export default {
  template: 'Search',
  computed: {
    loading() {
      return this.$store.getters.getLoading
    }
  },
  data() {
    return {
      city: '',
      street: '',
      streetNumber: '',
      radius: 500,
      cities: [
        { text: 'Warszawa', value: 'warszawa' },
        { text: 'Kraków', value: 'krakow' },
        { text: 'Gdańsk', value: 'gdansk' }
      ],
      showAlert: false
    };
  },
  methods: {
    search() {
      if (!this.city) {
        return this.$refs.modalCity.show();
      }

      if (!this.street) {
        return this.$refs.modalStreet.show();
      }

      if (!this.radius) {
        return this.$refs.modalRadius.show();
      }

      const homeData = {
        city: this.city,
        street: this.street,
        streetNumber: this.streetNumber,
        radius: this.radius,
        shops: this.$store.getters.getAllShopsCopy
      };

      console.log('homeData = ', homeData)
      console.log('this.$store.getters.getStocksSelected = ', this.$store.getters.getStocksSelected)

      this.$store.dispatch('findSelectedShops', homeData)
      this.$store.dispatch('getStock', this.$store.getters.getStocksSelected)
      //this.$store.dispatch('showTable', true)
      this.$store.dispatch('showLoader', true)

    },
    hideModalCity() {
      this.$refs.modalCity.hide();
    },
    hideModalStreet() {
      this.$refs.modalStreet.hide();
    },
    hideModalRadius() {
      this.$refs.modalRadius.hide();
    },
    reset() {
      this.city = '';
      this.street = '';
      this.streetNumber = '';
      this.radius = 500;

      this.$store.dispatch('toggleCheckboxes');
      this.$store.dispatch('showTable', false);
      //this.$store.dispatch('addAllShops')
    }
  }
};
</script>
