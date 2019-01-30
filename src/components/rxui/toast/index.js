import Vue from 'vue';
import toastTemple from './toast.vue';

function merge(...arg) {
  arg.map(parme => {
    if (!parme) return;
    Object.keys(parme).map(item => {
      const val = parme[item];
      if (val !== undefined) {
        arg[0][item] = val;
      }
    });
  });
  return arg[0];
}
let instance;
const ToastBox = Vue.extend(toastTemple);

const initInstance = () => {
  instance = new ToastBox({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};
const toast = (opt) => {
  if (typeof opt === 'string') {
    opt = {
      message: opt
    };
  }
  initInstance();
  merge(instance, initInstance.$data, opt);
  instance.isShow = true;
};

['success', 'error', 'info', 'warning'].forEach(item => {
  toast[item] = (msg, position = 'middle') => toast({
    message: msg,
    type: item,
    position
  });
});
export default toast;
