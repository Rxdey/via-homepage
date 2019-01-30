import Vue from 'vue';
import { touchRipple } from 'vue-touch-ripple';

const Ripple = Vue.extend(touchRipple);
const options = {
  color: '#ffffff',
  opacity: 0.2,
  speed: 3,
  transition: 'ease'
};
const createRipple = (el, binding) => {
  if (JSON.stringify(binding.value) === '{}' || !JSON.stringify(binding.value)) {
    el.ripple.$props.globalOptions = options;
  }
  el.ripple.$props.globalOptions = { ...options, ...binding.value };
  el.parentNode.appendChild(el.ripple.$el);
  el.ripple.$el.appendChild(el);
};
export default Vue.directive('ripple', {
  inserted(el, binding) {
    el.ripple = new Ripple({
      el: document.createElement('div')
    });
    createRipple(el, binding);
  },
  update(el, binding) {
    if (JSON.stringify(binding.value) === '{}' || !JSON.stringify(binding.value)) {
      el.ripple.$props.globalOptions = options;
    }
    el.ripple.$props.globalOptions = { ...options, ...binding.value };
  },
  unbind(el) {
    el.parentNode.appendChild(el);
    el.parentNode.removeChild(el.ripple.$el);
  }
});
