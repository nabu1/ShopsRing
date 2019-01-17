<template src='./ShopsTable.html'></template>

<script>
import axios from 'axios'

export default {
  created() {
    this.$store.dispatch('addAllShops')
  },
  computed: {
    items() {
      //return this.$store.getters.getAllShops
      return this.$store.getters.getSelectedShops
    },
    fields() {
      return this.$store.getters.getStock
    },
    loading() {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    showTable() {
      return this.$store.getters.getShowTable
    }
  }
}
</script>

<style scoped>
  div {
    color: white
  }
</style>

