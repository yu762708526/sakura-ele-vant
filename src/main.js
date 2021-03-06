import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/styles/reset.css'
import './common/icon/iconfont.css'
import fastclick from 'fastclick'
import 'lib-flexible'
import './vant/vant'
import './common/styles/resetvant.styl'
import './mock/mockServer'
import VueLazyload from 'vue-lazyload'
import loading from '../src/common/images/loading.gif'
import './filter/index'

Vue.use(VueLazyload, {
  loading
})
Vue.config.productionTip = false
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
