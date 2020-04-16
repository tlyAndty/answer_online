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


Vue.use(VueQuillEditor)
Vue.use(VueResource);
Vue.prototype.$axios=axios
Vue.config.productionTip = false



new Vue({
  el: '#app',
  router,
  store,
  axios,
  qs,
  components: { App },
  template: '<App/>'
})
