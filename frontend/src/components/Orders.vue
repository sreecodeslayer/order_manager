<template>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12 v-for="(order, index) in orders" :key="order.id">
          <v-card class="elevation-7">
            <v-card-title primary-title>Order ID : <pre>{{ order.id }}</pre></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <span>Customer : <span class="title">{{ order.customer }}</span></span>
                </v-flex>
              </v-layout>
              <v-spacer></v-spacer>
              <br>
              <span class="subheading">Ordered Items:</span>
              <br>
              <br>
              <v-layout row wrap v-for="product in order.items" :key="product.id">
                <v-flex xs4>
                  <p>{{ product.item.name }}</p>
                </v-flex>
                <v-flex xs4>
                  <p>{{ product.qty }} KG</p>
                </v-flex>
                <v-flex xs4>
                  <p>Rs. {{ product.total }}</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="subheading green--text">Grand Total: <strong class="red--text">{{ order.total }}</strong></p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
    export default {
      name: 'Orders',
      data () {
        return {
          orders: []
        }
      },
      methods: {
        getOrders () {
          this.$http.get('/api/v1/orders').then(
            (response) => {
              this.orders = response.data
            },
            (err) => {
              console.log(err.response)
            })
        }
      },
      created () {
        this.getOrders()
      }
    }
</script>