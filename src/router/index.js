import Vue from 'vue'
import Router from 'vue-router'
import LayoutApp from '../layouts/app.vue'
import Dashboard from '../pages/dashboard.vue'
import Space from '../pages/space.vue'
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
