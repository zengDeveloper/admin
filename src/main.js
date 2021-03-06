// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(VueAxios, axios)
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
