import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/pages/index'
import role from '@/pages/resource/role'
import user from '@/pages/resource/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
      {
        path:'/resource/role',
        name:'role',
        component:role
      },
      {
        path:'/resource/user',
        name:'user',
        component:user
      }
      ]
    }
    ]
})
