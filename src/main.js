import Vue from 'vue'
import App from './App.vue'
import './utils/vant'
import './utils/hammer'
import router from './router'
// import './utils/vconsole'
import 'lib-flexible'
import VueTouch from 'vue-touch'

import '@/assets/normalize.css'
Vue.config.productionTip = false
Vue.use(VueTouch, { name: 'v-touch' })

// new Vue 启动
new Vue({
  VueTouch,
  router,
  render: h => h(App)
}).$mount('#app')
