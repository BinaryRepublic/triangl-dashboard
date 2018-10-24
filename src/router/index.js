import Vue from 'vue'
import Router from 'vue-router'
import LayoutLanding from '../layouts/landing.vue'
import LayoutApp from '../layouts/app.vue'
import Dashboard from '../pages/dashboard.vue'
import Login from '../pages/login.vue'

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
      path: '/',
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      // path: '/app',
      path: '/app',
      name: 'LayoutApp',
      component: LayoutApp,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
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
