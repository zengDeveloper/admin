import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/pages/index'
import role from '@/pages/resource/role'
import user from '@/pages/resource/user'
import resource from '@/pages/resource/resource'

Vue.use(Router)

let vueRouter

let menuss = sessionStorage.getItem("menuss")
let childrenRouters = []
if(menuss){
    menuss = JSON.parse(menuss)
    for(let i in menuss){
        let childrens = menuss[i].children
        for (let j in childrens ) {
            childrens[j].component = resolve => require(['../pages' + childrens[j].resourcePath +'.vue'], resolve)
        }
        childrenRouters.push.apply(childrenRouters,childrens)
    }
}


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
      component: index,
      children:[
          ...childrenRouters
      ]
    }
    ]
})
export default vueRouter
