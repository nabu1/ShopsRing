<template src='./ShopsTable.html'></template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  created() {
    this.$store.dispatch('addAllShops')
    this.$store.dispatch('getStock')
  },
  computed: {
    items() {
      return this.$store.getters.getAllShops
      console.log('items(): this.$store.getters.getShowTable', this.$store.getters.getShowTable)
    },
    fields() {
      return this.$store.getters.getStock
    }
  },
  data() {
    return {
      items: items(),
      showTable: showTable()
    }
  },
  methods: {
    showTable() {
      console.log('showTable(): this.$store.getters.getShowTable', this.$store.getters.getShowTable)
      //return this.$store.getters.getShowTable // todo:
      return false
    }
  }
}
</script>
