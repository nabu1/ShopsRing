<template src="./Hub.html"></template>

<script>
  import Search from '../Search/Search.vue'
  import ShopsTable from '../ShopsTable/ShopsTable.vue'
  import StockSelector from '../StockSelector/StockSelector.vue'

  export default {
    template: 'Hub',
    components: {
      'stock-selector': StockSelector,
      Search,
      'shops-table': ShopsTable
    }
  }
</script>
