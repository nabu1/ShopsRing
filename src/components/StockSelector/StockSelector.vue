<template>
  <div>
    <b-container>
      <b-row class='klasa'>

        <b-form-group label="Pieczywo i nabiał">
          <b-form-checkbox-group v-model="selected1"
                                 :options="options1">
          </b-form-checkbox-group>
        </b-form-group>
      </b-row>

      <b-row class='klasa'>
        <b-form-group label="Mięcho i wędliny">
          <b-form-checkbox-group v-model="selected2"
                                 :options="options2">
          </b-form-checkbox-group>
        </b-form-group>
      </b-row>

        <div>Selected: <strong>{{ selected1.concat(selected2) }}</strong></div>
    </b-container>
  </div>
</template>

<script>
  import { stocks1, stocks2 } from '../../data/data'

  export default {
    data() {
      return {
        selected1: [],
        selected2: [],
        options1: stocks1,
        options2: stocks2
      }
    }
  }
</script>

<style scoped>
  .klasa {
    font-weight: 600
  }
  label {
    font-size: 18em
  }
</style>
