import Vue from 'vue'
import App from './App.vue'
import './utils/vant'
import './utils/hammer'
import 'lib-flexible'

import '@/assets/normalize.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
