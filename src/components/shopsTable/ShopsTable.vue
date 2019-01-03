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
      //const getStock = this.$store.getters.getStock
      const getStock = this.$store.getters.getStock.concat({ key: 'address', 'gmaps', 'google','jakd', 'shopName'})

      //console.log('getAllShops')
      //console.table(getAllShops)

      console.log('getStock')
      console.table(getStock)

      const shopPricesTotal = getAllShops.reduce((previous, item) => {
        return previous + item.chleb
      }, 0)

      console.log('shopPricesTotal', shopPricesTotal);


      return getAllShops
    },
    fields() {
      return this.$store.getters.getStock
    }
  },
  methods: {
    calcTotal(allShops) {
      console.log('allShops', allShops)
    }
  },
  data() {
    return {
      items: items()
    }
  }
}
</script>
