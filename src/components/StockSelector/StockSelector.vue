<template src="./StockSelector.html"></template>

<script>
import { stocksToBuy } from "../../data/data"

export default {
  data() {
    return {
      selected: [],
      options: stocksToBuy
    }
  },
  methods: {
    stockSelected() {
      setTimeout(() => {
        const stockSelected = this.selected
        this.$store.dispatch("getStock", stockSelected)

        const shops = this.$store.getters.getAllShops
        const stocks = this.$store.getters.getStocksSelected

        shops.map((shop, index) => {
          let suma = 0
          let pricesTotal = stocks.map(stock => suma += shop[stock])
          shops[index].total = pricesTotal.pop()
        })

        this.$store.dispatch('addTotal', shops)
      }, 0)
    }
  }
}
</script>

<style scoped>
.klasa {
  font-weight: 600
}
</style>
