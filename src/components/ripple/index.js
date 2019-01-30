import Vue from 'vue';
import TouchRipple from './muse-ripple/internal/TouchRipple';

const Ripple = Vue.extend(TouchRipple);
const options = {
  color: '#ffffff',
  opacity: 0.2
};

const createRipple = (el, binding) => {
  if (JSON.stringify(binding.value) === '{}' || !JSON.stringify(binding.value)) {
    el.ripple._props = { ...el.ripple.$props, ...options };
  }
  el.ripple._props = { ...el.ripple.$props, ...binding.value };
  // if (!el.style.position) {
  //   el.style.position = 'relative';
  // }
  el.appendChild(el.ripple.$el);
};
export default {
  inserted(el, binding) {
    el.ripple = new Ripple({
      el: document.createElement('div')
    });
    createRipple(el, binding);
  },
  update(el, binding) {
    if (JSON.stringify(binding.value) === '{}' || !JSON.stringify(binding.value)) {
      el.ripple._props = { ...el.ripple.$props, ...options };
    }
    el.ripple._props = { ...el.ripple.$props, ...binding.value };
  },
  unbind(el) {
    el.removeChild(el.ripple.$el);
  }
};
