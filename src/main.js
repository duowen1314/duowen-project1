import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components' // 自定义组件
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.less'
import axios from './utils/axios.config'

// 给Vue对象的原型属性赋值
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(Component)

// 阻止vue在启动时生成提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
