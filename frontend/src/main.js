// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueAxios from 'vue-axios'
import axios from 'axios'

import VueAuthenticate from 'vue-authenticate'
import VueAuthorize from 'vue-authorize'

axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// JWT Auth

// let host = window.location.origin
let host = 'http://127.0.0.1:6363'

Vue.use(VueAuthenticate, {
  tokenName: 'auth_token',
  baseUrl: host,
  storageType: 'cookieStorage',
  // Secure cookie storage only works on Production and not on localhost
  // cookieStorage: { secure: true },
  providers: {
  }
})

Vue.use(VueAuthorize, {
  roles: {
    user: {
      handler: function () {
        return this.$auth.isAuthenticated()
      },

      permissions: ['can_view']
    }
  },

  permissions: {
    can_view: function () {
      return true
    }
  }
})

router.beforeEach(function (to, from, next) {
  if (to.meta && to.meta.permissions) {
    let roles = to.meta.permissions.roles
    let permissions = to.meta.permissions.permissions

    router.app.$authorize.isAuthorized(roles, permissions).then(function () {
      next()
    }).catch(function () {
      next(to.meta.permissions.redirectTo || '/login')
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
