<template src="./StockSelector.html"></template>
<script>
import { stocksToBuy } from "../../data/data"
export default {
  data() {
    return {
      selected: [],
      options: stocksToBuy,
      show: true
    }
  },
  methods: {
    resetStock() {
      this.selected = []
      this.$store.dispatch("getStock", [])
    },

    stockSelected() {
      setTimeout(() => {
        this.$store.dispatch("getStock", this.selected)
        const shops = this.$store.getters.getAllShops
        const stocks = this.$store.getters.getStocksSelected
        let suma = 0

        shops.map((shop, index) => {
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
  div {
    color: white
  }
</style>
