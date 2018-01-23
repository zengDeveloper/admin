import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/pages/index'
import role from '@/pages/resource/role'
import user from '@/pages/resource/user'
import resource from '@/pages/resource/resource'

Vue.use(Router)

let vueRouter


vueRouter =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: index
    }
    ]
})
// let registerRouteFresh = true
// if (registerRouteFresh){
//     vueRouter.addRoutes(JSON.parse(sessionStorage.getItem('routes')))
// }

export default vueRouter
