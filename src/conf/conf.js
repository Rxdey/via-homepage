// import baidu from '../assets/img/logo/baidu.png';
// import google from '../assets/img/logo/googlew.png';
// import bing from '../assets/img/logo/bying.png';

const getItem = name => {
  const res = window.localStorage.getItem(name);
  return res || '';
};

const defaultEngine = [
  {
    name: '谷歌',
    url: 'https://www.google.com/search?q=%s',
    logo: './icon/googlew.png',
    readonly: true
  },
  {
    name: '必应',
    url: 'https://cn.bing.com/search?q=%s',
    logo: './icon/bying.png',
    readonly: true
  },
  { name: '百度', url: 'https://www.baidu.com/s?word=%s', logo: './icon/baidu.png', readonly: true }
];
const defaultShortcut = [
  {
    name: '哔哩哔哩',
    url: 'https://www.bilibili.com/',
    id: 'url1',
    icon: './icon/bilibili.png',
    background: '#26a2ff'
  },
  {
    name: '知乎',
    url: 'https://www.zhihu.com/',
    id: 'url2',
    icon: './icon/zhihu.png',
    background: '#26a2ff'
  }
];

const changeArray = (arr, name) => {
  const def = {
    searchEngine: () => {
      window.localStorage.setItem('searchEngine', JSON.stringify(defaultEngine));
      return defaultEngine;
    },
    shortcuts: () => {
      window.localStorage.setItem('shortcuts', JSON.stringify(defaultShortcut));
      return defaultShortcut;
    }
  };
  if (!arr || arr === 'undefined' || arr === 'null') {
    return def[name]();
  }
  return JSON.parse(arr);
};

const isDef = index => {
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
  searchEngine: changeArray(getItem('searchEngine'), 'searchEngine'), // 搜索引擎
  defaultRule: isDef(getItem('defaultRule')), // 当前搜索引擎
  height: getItem('height') || '10%', // 位置
  isLogo: getItem('isLogo') || '1', // 是否显示logo
  isDiyLogo: getItem('isDiyLogo') || '1', // 是否启用自定义logo
  isShortcut: getItem('isShortcut') || '1', // 启用快捷导航
  shortcuts: changeArray(getItem('shortcuts'), 'shortcuts'),
  covor: getItem('covor') || '1', // 是否启用covor
  black: getItem('black') || '0' // 黑色字体
};

export default conf;
