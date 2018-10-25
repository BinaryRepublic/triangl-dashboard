import Vue from 'vue'
import Router from 'vue-router'
import LayoutLanding from '../layouts/landing.vue'
import LayoutApp from '../layouts/app.vue'
import Dashboard from '../pages/dashboard.vue'
import Debug from '../pages/debug.vue'

// import Canvas from '../pages/canvas.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'LayoutLanding',
    //   component: LayoutLanding,
    //   children: []
    // },
    {
      // path: '/app',
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
