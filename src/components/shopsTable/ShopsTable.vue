<template src="./ShopsTable.html"></template>

<script>
import axios from 'axios'

export default {
  created() {
    this.$store.dispatch('addAllShops')
    this.$store.dispatch('getFields')
  },
  computed: {
    items() {
      return this.$store.getters.getAllShops
    },
    fields() {
      return this.$store.getters.getFields
    }
  },
  data() {
    return {
      items: items() || []
    }
  }
}
</script>
