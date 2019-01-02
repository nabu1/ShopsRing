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
        this.$store.dispatch("getFields", stockSelected)
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
