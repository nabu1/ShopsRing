<template src="./StockSelector.html"></template>
<script>
import { stocksToBuy } from "../../data/data"
export default {
  computed: {
    show() {
      return this.$store.getters.getShowCheckboxes
    }
  },
  data() {
    return {
      selected: [],
      options: stocksToBuy,
      show: true,
      selected: []
    }
  },
  methods: {
    resetStock() {
      this.$store.dispatch('toggleCheckboxes')
      this.$store.dispatch("getStock",[])
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
.klasa {
  font-weight: 600
}
</style>
