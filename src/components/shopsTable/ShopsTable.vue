<template src="./ShopsTable.html"></template>

<script>
import axios from "axios"
import _ from 'lodash'

export default {
  created() {
    this.$store.dispatch("addAllShops")
    this.$store.dispatch("getStock")
  },
  computed: {
    items() {
      const getAllShops = this.$store.getters.getAllShops
      const getStock = this.$store.getters.getStock

      console.log('getStock')
      console.table(getStock)

      console.log('getAllShops')
      console.log(getAllShops)

      /* Pętla .map przez sklepy i reduce cen np sera
         Otrzymany total dodać za polem adres
      */

      return getAllShops
    },
    fields() {
      return this.$store.getters.getStock
    }
  },
  data() {
    return {
      items: items()
    }
  }
}
</script>
