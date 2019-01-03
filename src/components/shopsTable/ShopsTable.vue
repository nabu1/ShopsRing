<template src="./ShopsTable.html"></template>

<script>
import axios from "axios"
import _ from 'lodash'

export default {
  created() {
    this.$store.dispatch("addAllShops")
    this.$store.dispatch("getStock")
  },
  computed: {
    items() {
      return this.$store.getters.getAllShops
    },
    fields() {
      return this.$store.getters.getStock
    }
  },
  data() {
    return {
      items: items()
    }
  }
}
</script>
