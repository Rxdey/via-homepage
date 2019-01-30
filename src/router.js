import Vue from 'vue';
import Router from 'vue-router';
import home from '@/views/home.vue';
import App from '@/App.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: App
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: ''
      }
    }
  ]
});
