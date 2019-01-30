import TouchRipple from './internal/TouchRipple';

export const touchRipple = TouchRipple;
export default {
  install(Vue) {
    Vue.component('mu-ripple', TouchRipple);
  }
};
