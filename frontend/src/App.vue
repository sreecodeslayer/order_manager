<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat icon v-if="$auth.isAuthenticated()" @click.prevent="logout"><v-icon>power_settings_new</v-icon></v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
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
        icon: 'bubble_chart',
        title: 'Inspire'
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
