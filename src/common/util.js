export const hasOwnKey = (obj, key) => obj.hasOwnProperty(key);
export const hasClass = (elements, cName) => !!elements.className.match(new RegExp(`(\\s|^)${cName}(\\s|$)`));
export const addClass = (elements, cName) => {
  if (!hasClass(elements, cName)) {
    elements.className += ` ${cName}`;
  }
};
export const removeClass = (elements, cName) => {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(new RegExp(`(\\s|^)${cName}(\\s|$)`), '');
  }
};

export const isPC = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  return !Agents.some(item => userAgentInfo.includes(item));
};

// localstorage同域名加前缀
export const rxLocalStorage = {
  getItem(name) {
    const tag = `${window.location.pathname}__VASS__`;
    return localStorage.getItem(tag + name);
  },
  setItem(name, data) {
    const tag = `${window.location.pathname}__VASS__`;
    localStorage.setItem(tag + name, data);
  },
  removeItem(name) {
    const tag = `${window.location.pathname}__VASS__`;
    localStorage.removeItem(tag + name);
  }
};

// 获取链接参数
export const getCode = name => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

// 随机字符串
export const createRands = (len = 5) => {
  if (len > 11) {
    len = 11;
  }
  const str = Math.random()
    .toString(36)
    .substr(2);
  return str.substr(0, len);
};

// base64转blob
export function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// 更改title
export const changeTitle = title => {
  document.title = title;
  if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    const i = document.createElement('iframe');
    i.src = '';
    i.style.display = 'none';
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 100);
    };
    document.body.appendChild(i);
  }
};

// 手机号正则
export const mobileReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;

// 数字字母正则
export const noChinese = /^[A-Za-z0-9]+$/;

export const vibrate = (delay = 1000) => {
  const supportsVibrate = 'vibrate' in window.navigator;
  if (supportsVibrate) {
    navigator.vibrate(delay);
  }
};
// url解析
export const urlReg = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
