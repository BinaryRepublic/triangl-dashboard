import Vue from 'vue'
import Router from 'vue-router'
import LayoutApp from '../layouts/app.vue'
import Callback from '../pages/authCallback.vue'
import Dashboard from '../pages/dashboard.vue'
import Space from '../pages/space.vue'
import Spaces from '../pages/spaces.vue'
import Account from '../pages/account.vue'
import Debug from '../pages/debug.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LayoutApp',
      component: LayoutApp,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/callback',
          name: 'Callback',
          component: Callback
        },
        {
          path: '/spaces',
          name: 'Spaces',
          component: Spaces
        },
        {
          path: '/space',
          redirect: '/'
        },
        {
          path: '/space/:id',
          name: 'Space',
          component: Space,
          props: true
        },
        {
          path: '/account',
          name: 'Account',
          component: Account
        },
        {
          path: '/debug',
          name: 'Debug',
          component: Debug
        }
      ]
    }
  ],
  mode: 'history'
})

// {
//   path: '/add',
//   name: 'addBlog',
//   component: addBlog
// },
// {
//   path: '/canvas',
//   name: 'Canvas',
//   component: Canvas
// }
