<template>
  <div>
    <b-container>
      <b-row class="klasa">
        <b-form-group label="Pieczywo i nabiał">
          <b-form-checkbox-group v-model="selected1"
                                 @change="stockSelected"
                                 :options="options1">
          </b-form-checkbox-group>
        </b-form-group>
      </b-row>

      <b-row class="klasa">
        <b-form-group label="Mięcho i wędliny">
          <b-form-checkbox-group v-model="selected2"
                                 @change="stockSelected"
                                 :options="options2">
          </b-form-checkbox-group>
        </b-form-group>
      </b-row>
    </b-container>
  </div>
</template>

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
