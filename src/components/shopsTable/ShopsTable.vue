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

/*
"google": "<a href='https://www.google.com'>Google</a>",
"jakd": "<a href='http://jakdojade.pl/?fn=dworzec&tn=Wawel&tc=50.05434:19.93931&cid=5000'>JakD</a>",
"gmaps": "<a href='https://www.google.com/maps/dir/52.2264633,21.1591854/Dolna+5,+Warszawa'>Gmaps</a>"
 */

<script>
import axios from 'axios'

export default {
  mounted() {
    this.loadShops();
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
          key: "total",
          label: "Total",
          sortable: true,
          variant: 'warning'
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
          key: "address",
          label: "Address",
          sortable: true
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
        }
      ],
      items: []
    }
  },
  methods: {
    loadShops() {
      axios
        .get("http://localhost:3000/biedry")
        .then(res => {
          console.log(res)
          this.items = res.data
        })
        .catch(err => console.log(err));
    }
  }
}
</script>
