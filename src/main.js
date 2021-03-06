import Vue from 'vue';
import { Dialog } from 'vant';
// import 'animate.css';
import 'lib-flexible';
import loading from 'vue-loading-rx';
import 'vue-loading-rx/dist/vue-loading.css';
import './assets/css/reset.less';
import App from './App.vue';
import router from './router';
import store from './store/store';
import mixins from './common/mixin';
import { ripple, transferDom } from './components/index';

Vue.use(loading);
Vue.use(Dialog);
Vue.mixin(mixins);
Vue.directive('ripple', ripple);
Vue.directive('transferDom', transferDom);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
