import Vue from 'vue'
import App from './App'
import api from './api'
import store from './store'
import router from './router'

Vue.prototype.api = api

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
