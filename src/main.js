import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.less'
import axios from 'axios'
// ？？？？
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// http://ttapi.research.itcast.cn/mp/v1_0/authorizations
// http://ttapi.research.itcast.cn/mp/authorizations
// 给Vue对象的原型属性赋值
Vue.prototype.$axios = axios
Vue.use(ElementUI)

// 阻止vue在启动时生成提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
