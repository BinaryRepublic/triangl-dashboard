// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
const config = require('../config')

Vue.prototype.$api = axios.create({
  baseURL: config.API_ENDPOINT.live
})

Vue.config.devtools = true

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Vuex)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
