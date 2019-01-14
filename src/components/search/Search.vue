<template src='./Search.html'></template>

<script>
import axios from "axios";

export default {
  template: "Search",
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  data() {
    return {
      city: "",
      street: "",
      streetNumber: "",
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
        return this.$refs.modalCity.show();
      }
      if (!this.street) {
        return this.$refs.modalStreet.show();
      }
      if (!this.radius) {
        return this.$refs.modalRadius.show();
      }

      this.$store.dispatch("addAllShops");

      //console.log("1. getAllShops = ", this.$store.getters.getAllShops);
      //console.log("1. getAllShopsCopy = ", this.$store.getters.getAllShopsCopy);

      setTimeout(() => {
        //console.log("2. getAllShops = ", this.$store.getters.getAllShops);
        //console.log("2. getAllShopsCopy = ", this.$store.getters.getAllShopsCopy);

        const homeData = {
          city: this.city,
          street: this.street,
          streetNumber: this.streetNumber,
          //radius: this.radius,
        };

        const radius = this.radius
        const allShops = this.$store.getters.getAllShopsCopy

        this.$store.dispatch("findSelectedShops", { homeData, radius, allShops })
        this.$store.dispatch("showLoader", true);

      }, 350)

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
      this.city = "";
      this.street = "";
      this.streetNumber = "";
      this.radius = 500;

      this.$store.dispatch("toggleCheckboxes");
      this.$store.dispatch("showTable", false);
      //this.$store.dispatch('addAllShops')
    }
  }
};
</script>


      sessionStorage.setItem('homeGPSAndAddress', JSON.stringify(homeGPSAndAddress))
  const sessionHomeGPSAndAddress = sessionStorage.getItem('homeGPSAndAddress');


