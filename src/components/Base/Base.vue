<template src="./Base.html"></template>

<script>
  import Search from '../Search/Search.vue'
  import ShopsTable from '../ShopsTable/ShopsTable.vue'
  import StockSelector from '../StockSelector/StockSelector.vue'

  export default {
    template: 'Base',
    components: {
      'stock-selector': StockSelector,
      'search-bar': Search,
      'shops-table': ShopsTable
    }
  }
</script>
