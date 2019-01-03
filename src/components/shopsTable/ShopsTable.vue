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
      console.log('this.$store.getters.getAllShops', this.$store.getters.getAllShops);
      return this.$store.getters.getAllShops
    },
    fields() {
      return this.$store.getters.getStock
    }
  },
  methods: {
    klik() {
      console.log('stockSelected !!!')
    }
  },
  data() {
    return {
      items: items()
    }
  }
}
</script>
