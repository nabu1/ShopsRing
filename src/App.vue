<template>
  <span>
    <search></search>
    <shops-table></shops-table>
  </span>
</template>

<script>
  import search from './components/search/Search.vue'
  import shopsTable from './components/shopsTable/ShopsTable.vue'

  export default {
    components: {
      'shops-table': shopsTable,
      search

    }
  }
</script>
