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
        const selectedShops = this.$store.getters.getSelectedShops
        const selectedStocks = this.$store.getters.getStocksSelected

        console.log('1. selectedShops = ', selectedShops)
        console.log('2. selectedStocks = ', selectedStocks)

        let suma = 0
        let pricesTotal = []

        selectedShops.map((shop, index) => {

          pricesTotal = selectedStocks.map(stock => {
            console.log('shop[stock] = ', shop[stock])
            suma += shop[stock]
            console.log('suma = ', suma)
          })

          //console.log('pricesTotal = ', pricesTotal)
          //shop.total = pricesTotal.pop()
          shop.total = suma
          suma = 0
          //pricesTotal = []
        })

        //console.log('selectedShops = ', selectedShops)
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
