import Vue from 'vue';
import 'lib-flexible';
import loading from 'vue-loading-rx';
import 'vue-loading-rx/dist/vue-loading.css';
import './assets/css/reset.less';
import App from './App.vue';
import router from './router';
import store from './store/store';
import mixins from './common/mixin';
import { ripple } from './components/index';

Vue.use(loading)
  .mixin(mixins)
  .directive('ripple', ripple);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
