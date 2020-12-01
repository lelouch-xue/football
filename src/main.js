import Vue from 'vue'
import App from './App.vue'
import './utils/vant'
import './utils/hammer'
// import router from './router'
// import './utils/vconsole'
import 'lib-flexible'

import '@/assets/normalize.css'
Vue.config.productionTip = false

// new Vue 启动
new Vue({
  render: h => h(App)
}).$mount('#app')
