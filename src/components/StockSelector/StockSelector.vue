<template src="./StockSelector.html"></template>

<script>
import { stocksToBuy } from '../../data/data'

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
      this.$store.dispatch('getStock', [])
    },
    stockSelected() {
      setTimeout(() => {
        let suma = 0
        this.$store.dispatch('getStock', this.selected)
        const selectedShops = this.$store.getters.getSelectedShops
        const selectedStocks = this.$store.getters.getStocksSelected

        selectedShops.map(shop => {
          selectedStocks.map(stock => (suma += shop[stock]))
          shop.total = suma
          suma = 0
        })

        this.$store.dispatch('addTotal', selectedShops)
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
