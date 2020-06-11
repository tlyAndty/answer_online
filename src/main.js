// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import './plugins/element.js' //这句引入了ElementUI
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import  './element'
import store from './vuex'
import axios from 'axios'
import qs from 'qs'
import VueResource from 'vue-resource'
import moment from 'moment'
import echarts from 'echarts'
import './assets/icon/iconfont.css'


Vue.use(VueQuillEditor)
Vue.use(VueResource);
Vue.prototype.$axios=axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
//全局过滤器
Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
  //es5函数参数设置默认值
  //const lastFormatString = formatString ||


  // moment(input) 把时间字符串转成时间对象
  // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  return moment(input).format(formatString)
})



new Vue({
  el: '#app',
  router,
  store,
  axios,
  qs,
  components: { App },
  template: '<App/>'
})
