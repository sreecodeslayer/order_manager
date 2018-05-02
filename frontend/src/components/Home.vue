<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>New order</v-card-title>
            <v-form ref="newOrderForm" v-model="newOrderForm">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field
                    name="name"
                    label="Enter customer name"
                    id="customerName"
                    v-model="newOrder.customer"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-data-table
                    :headers="headers"
                    :items="orderItems"
                    hide-actions
                    class="elevation-1"
                    pagination.sync="pagination"
                    item-key="id"
                    loading="true"
                    search="search"
                    >

                  </v-data-table>
                </v-flex>
                </v-layout> 
              </v-card-text>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      newOrderForm: true,
      newOrder: {},
      itemsList: [{id: '', qty: 1}],
      crops: [],
      headers: [
        {
          text: 'Item',
          align: 'center',
          sortable: false
        },
        {
          text: 'Quantity',
          align: 'center',
          sortable: false
        },
        {
          text: 'Price',
          align: 'center',
          sortable: false
        }
      ],
      orderItems: [
        {
          id: '',
          qty: ''
        }
      ]
    }
  },
  methods: {
    getAllCrops () {
      this.$http.get('http://127.0.0.1:6363/api/v1/crops')
    }
  },
  created () {
    this.getAllCrops()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
