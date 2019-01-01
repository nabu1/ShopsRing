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
    axios
      .get('http://localhost:3000/biedry')
      .then(res => {
        console.log('created()')
        console.log(res.data)
        this.$store.dispatch('addAllShops', res.data)
        this.items = this.$store.getters.getAllShops
      })
      .catch(err => console.log(err))
  },
  data() {
    return {
      fields: [
        'index',
        {
          key: "shopName",
          label: "Sklep",
          sortable: true
        },
        {
          key: "address",
          label: "Address",
          sortable: true
        },
        {
          key: "lat",
          label: "lat",
        },
        {
          key: "lon",
          label: "lon",
         },
        {
          key: "google",
          label: "Google"
        },
        {
          key: "jakd",
          label: "JakD"
        },
        {
          key: "gmaps",
          label: "Gmaps"
        },
        {
          key: "total",
          label: "Total",
          sortable: true,
          variant: 'warning'
        },
        {
          key: "chleb",
          label: "Chleb",
          sortable: true
        },
        {
          key: "maslo",
          label: "Masło",
          sortable: true
        },
        {
          key: "ser",
          label: "Ser",
          sortable: true
        },
        {
          key: "jajko",
          label: "Jajko",
          sortable: true
        },
        {
          key: "szynka",
          label: "Szynka",
          sortable: true
        },
        {
          key: "kielbasa",
          label: "Kiełbasa",
          sortable: true
        },
        {
          key: "cukier",
          label: "Cukier",
          sortable: true
        },
        {
          key: "mleko",
          label: "Mleko",
          sortable: true
        },
        {
          key: "smietana",
          label: "Śmietana",
          sortable: true
        },
        {
          key: "mineralna",
          label: "Mineralna",
          sortable: true
        },
        {
          key: "niematego",
          sortable: true
        }
      ],
      items: []
    }
  }
}
</script>
