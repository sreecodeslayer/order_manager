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
                    <div class="table__overflow">
                      <table class="datatable table">
                        <thead>
                          <tr>
                            <th class="column text-xs-center">Item</th>
                            <th class="column text-xs-center">Quantity(Kg)</th>
                            <th class="column text-xs-center">Price(Rs.)</th>
                            <th class="column text-xs-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in orderItems" :key="index">
                            <td>
                              <v-select :items="crops" item-text="name" v-model="item.selectedCrop" label="Select Crop" required></v-select>
                            </td>
                            <td class="text-xs-center">
                              <v-text-field name="itemQty" label="Enter quantity" id="itemQty" type="number" v-model="item.qty" @keyup.enter="orderItems.push({qty: 0,selectedCrop: {price:1,id:''}})"></v-text-field>
                            </td>
                            <td v-if="item.selectedCrop" class="text-xs-center subheading red--text">
                              <pre>{{ item.selectedCrop.price * item.qty }}</pre>
                            </td>
                            <td class="justify-center layout px-0">
                              <v-btn color="error" flat icon @click.native="orderItems.splice(index,1)">
                                <v-icon>cancel</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3" class="text-xs-right subheading">Grand Total ({{ orderItems.length }} Items)</td>
                            <td class="text-xs-center subheading green--text darken-3"><pre>{{ cartTotal }}</pre></td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="datatable table">
                        <div class="datatable__actions">
                          <v-btn color="success" flat icon @click.prevent="finalizeOrder">
                            <v-icon>check</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>
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
          qty: 0,
          selectedCrop: {
            id: '',
            price: 0
          }
        }
      ]
    }
  },
  methods: {
    getAllCrops () {
      this.$http.get('/api/v1/crops').then(
        (response) => {
          this.crops = response.data
        },
        (err) => {
          if (this.err.response.status === 401) {
            this.$auth.logout()
            this.$router.push('/login')
          }
        })
    },
    finalizeOrder () {
      this.newOrder.items = []

      for (var i = this.orderItems.length - 1; i >= 0; i--) {
        if (this.orderItems[i].selectedCrop.id && this.orderItems[i].qty > 0) {
          this.newOrder.items.push({
            qty: this.orderItems[i].qty,
            id: this.orderItems[i].selectedCrop.id
          })
        }
      }
      console.log(this.newOrder.items)

      if (this.newOrder.items.length > 0) {
        this.$http.patch('/api/v1/users/cart', this.newOrder).then(
          (response) => {
            if (response.status === 200) {
              this.orderItems = [
                {
                  qty: 0,
                  selectedCrop: {
                    id: '',
                    price: 0
                  }
                }
              ]

              this.newOrder = {}
              this.$refs.newOrderForm.reset()

              this.$http.post('/api/v1/orders').then(
                (response) => {

                },
                (err) => {
                  console.log(err.response)
                }
              )
            }
          },
          (err) => {
            console.log(err.response)
          }
        )
      }
    }
  },
  computed: {
    cartTotal () {
      var total = 0
      for (var i = this.orderItems.length - 1; i >= 0; i--) {
        total += this.orderItems[i].selectedCrop.price * this.orderItems[i].qty
      }
      return total
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
