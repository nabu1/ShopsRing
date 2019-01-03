<template src="./StockSelector.html"></template>

<script>
import { stocks1, stocks2 } from "../../data/data"

export default {
  data() {
    return {
      selected1: [],
      selected2: [],
      options1: stocks1,
      options2: stocks2
    };
  },
  methods: {
    stockSelected() {
      setTimeout(() => {
        const stockSelected = this.selected1.concat(this.selected2)
        console.log('DUPAAAAA !!')

        this.$store.dispatch("getStock", stockSelected)

        const shops = this.$store.getters.getAllShops
        const stocks = this.$store.getters.getStocksSelected

        console.log('shops = ', shops)
        console.log('stocks =', stocks)

        shops.map((shop, index) => {
          let suma = 0

          const total = stocks.map(stock => {
            console.log(`${shop.address}: ${stock} = ${shop[stock]}`)
            //console.log('stock = ', shop[stock])
            return suma += shop[stock]
          })

          console.log('total = ', total[total.length-1].toFixed(2))
          shops[index].total = total[total.length-1].toFixed(2)


        })

        console.log('___ shops z totalem =', shops)

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
