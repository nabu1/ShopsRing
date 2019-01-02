<template>
  <span>
    <stock-selector></stock-selector>
    <search></search>
    <shops-table></shops-table>
    <!-- <tst></tst> -->
  </span>
</template>

<script>
  import search from './components/search/Search.vue'
  import shopsTable from './components/shopsTable/ShopsTable.vue'
  import StockSelector from './components/StockSelector/StockSelector.vue'
  //import tst from './tst.vue'

  export default {
    components: {
      'shops-table': shopsTable,
      search,
      'stock-selector': StockSelector
      //tst
    }
  }
</script>


