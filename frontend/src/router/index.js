import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Orders from '@/components/Orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        permissions: {
          roles: ['user'],
          permissions: ['can_view'],
          redirectTo: '/login'
        }
      }
    }, {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        permissions: {
          roles: ['user'],
          permissions: ['can_view'],
          redirectTo: '/login'
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
