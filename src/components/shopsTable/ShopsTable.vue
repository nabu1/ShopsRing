<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-table striped hover bordered :items="items" :fields="fields">

          <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
          <template slot="total" slot-scope="data">{{ data.value * 100 }}</template>

          <span slot="google" slot-scope="data" v-html="data.value">{{ data.value }}</span>
          <span slot="jakd" slot-scope="data" v-html="data.value">{{ data.value }}</span>
          <span slot="gmaps" slot-scope="data" v-html="data.value">{{ data.value }}</span>

        </b-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created() {
    this.$store.dispatch('addAllShops')
    this.$store.dispatch('getFields')
  },
  computed: {
    items() {
      console.log('this.$store.getters.getAllShops', this.$store.getters.getAllShops)
      return this.$store.getters.getAllShops
    },
    fields() {
      console.log('this.$store.getters.getFields', this.$store.getters.getFields)
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
