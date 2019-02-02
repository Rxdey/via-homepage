import baidu from '../assets/img/logo/baidu.png';
import google from '../assets/img/logo/googlew.png';
import bing from '../assets/img/logo/bying.png';

const getItem = name => {
  const res = window.localStorage.getItem(name);
  return res || '';
};

const defaultEngine = [
  { name: '谷歌', url: 'https://www.google.com/search?q=%s', logo: google, readonly: true },
  { name: '必应', url: 'https://cn.bing.com/search?q=%s', logo: bing, readonly: true },
  { name: '百度', url: 'https://www.baidu.com/s?word=%s', logo: baidu, readonly: true }
];

const changeArray = arr => {
  if (!arr || arr === 'undefined' || arr === 'null') {
    window.localStorage.setItem('searchEngine', JSON.stringify(defaultEngine));
    return defaultEngine;
  }
  return JSON.parse(arr);
};

const isDef = (index) => {
  index = parseInt(index, 10);
  if (Number.isNaN(index) || index >= changeArray(getItem('searchEngine')).length) {
    window.localStorage.setItem('defaultRule', 0);
    return 0;
  }
  return index;
};

const conf = {
  bgimg: getItem('bgimg') || 'http://ww1.sinaimg.cn/large/005O2C54gy1fzr5cs91l5j30u01277sm.jpg', // 背景图
  logo: getItem('logo'), // 自定义logo
  blur: getItem('blur') || 0, // 模糊
  searchEngine: changeArray(getItem('searchEngine')), // 搜索引擎
  defaultRule: isDef(getItem('defaultRule')), // 当前搜索引擎
  height: getItem('height') || '10%', // 位置
  isLogo: getItem('isLogo') || '1', // 是否显示logo
  isDiyLogo: getItem('isDiyLogo') || '1', // 是否启用自定义logo
  isShortcut: getItem('isShortcut') || '1' // 启用快捷导航
};

export default conf;
