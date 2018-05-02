<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-if="['Login', 'Register'].indexOf($route.name) <= -1" v-model="drawer" enable-resize-watcher fixed dark app>

      <v-list dense class="pt-0">
        <v-list-tile :ripple="true" v-for="item in items" :key="item.title" :href="item.href">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" dark>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat icon v-if="$auth.isAuthenticated()" @click.prevent="logout"><v-icon>power_settings_new</v-icon></v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <v-layout column align-center  >
        
        <span>Sreenadh TC&copy; 2018</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'add_shopping_cart',
        title: 'New Order',
        href: '#/'
      }, {
        icon: 'view_list',
        title: 'Orders',
        href: '#/orders'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Order Manager'
    }
  },
  name: 'App',
  methods: {
    logout () {
      if (this.$auth.isAuthenticated()) {
        this.$auth.logout()
      }

      this.$router.push('/login')
    }

  }
}
</script>
