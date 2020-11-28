import Vue from 'vue'
import App from './App.vue'
import './utils/vant'
import './utils/hammer'
import VueRouter from 'vue-router'
// import './utils/vconsole'
import 'lib-flexible'

import '@/assets/normalize.css'
Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App)
}).$mount('#app')
