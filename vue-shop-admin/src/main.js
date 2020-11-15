import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css' //全局样式

Vue.config.productionTip = false
Vue.use(ElementUI);

axios.interceptors.request.use(config => { //拦截器 请求之前在请求头中添加字段用于存放token给后端进行验证
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')// Authorizationz这个字段名是根据接口文档来决定的
  // 最后必须将请求对象config return 出去
  return config
})

Vue.prototype.$http = axios;
axios.defaults.baseURL = '/api/'  // api 即上面 vue.config.js 中配置的地址

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
