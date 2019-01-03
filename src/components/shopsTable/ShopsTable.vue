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
      const stocksSelected = this.$store.getters.getStocksSelected

      console.log('stocksSelected')
      console.table(stocksSelected)

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
