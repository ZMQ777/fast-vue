import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Home from '@/pages/home'

Vue.use(Router)

let route = new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Index,
    redirect: {name: 'home'},
    children: [{
      path: '/home',
      name: 'home',
      component: Home
    }]
  }]
})

export default route
