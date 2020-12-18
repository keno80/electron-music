import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//antd组件
import antd from "@/utils/antd";
Vue.use(antd)

//element组件
import element from '@/utils/element'
Vue.use(element)

import '@/style/fonts.scss'

//axios
import './utils/http'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
