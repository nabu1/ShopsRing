<template src="./StockSelector.html"></template>
<script>
import { stocksToBuy } from "../../data/data"
export default {
  computed: {
    show() {
      console.log('getShowCheckboxes', this.$store.getters.getShowCheckboxes)
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
      console.log('this.show = ', this.show)
      this.$store.dispatch('toggleCheckboxes')
      this.selected = []
      this.$store.dispatch("getStock", this.selected)
    },

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
