import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import http from './http';
// 全局变量
Vue.prototype.$fetch = http.fetch;
Vue.prototype.$post = http.post;

Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
