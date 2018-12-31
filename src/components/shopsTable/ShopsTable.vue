<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-table striped hover bordered :items="items" :fields="fields"></b-table>
      </b-row>
    </b-container>
    <button @click="loadShops">loadShops</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  mounted() {
    this.loadShops();
  },
  data() {
    return {
      fields: [
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
          key: "address",
          label: "Address",
          sortable: true,
          width: 33
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
