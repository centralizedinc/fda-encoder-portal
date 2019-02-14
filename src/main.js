import Vue from 'vue'
import vtooltip from 'v-tooltip'

import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import NProgress from 'nprogress';
import notify from "@/plugins/notify";
// import print from "@/plugins/print";
import print from 'fda-pdf-printer-plugin'
import mixins from "@/plugins/mixins"

import './plugins/vuetify'
import './registerServiceWorker'


import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/css/fdastyle.scss'
import '../node_modules/nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(vtooltip)

Vue.use(notify, store)
Vue.use(print)
Vue.use(mixins)

NProgress.configure({
  showSpinner: false,
  trickleRate: 0.5,
  trickleSpeed: 800
});
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')