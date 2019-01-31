import baidu from '../assets/img/logo/baidu.png';
import google from '../assets/img/logo/googlew.png';
import bing from '../assets/img/logo/bying.png';

const getItem = name => {
  const res = window.localStorage.getItem(name);
  return res || '';
};
const changeArray = arr => {
  if (!arr) {
    return [];
  }
  return JSON.parse(arr);
};
const defaultEngine = [
  { name: '谷歌', url: 'https://www.google.com/search?q=%s', logo: google, readonly: true },
  { name: '必应', url: 'https://cn.bing.com/search?q=%s', logo: bing, readonly: true },
  { name: '百度', url: 'https://www.baidu.com/s?word=%s', logo: baidu, readonly: true }
];

const conf = {
  bgimg: getItem('bgimg') || 'https://ws1.sinaimg.cn/large/005O2C54gy1fzppzyyod3j30jg0ylwfz.jpg', // 背景图
  logo: getItem('logo'), // logo
  blur: getItem('blur') || 0, // 模糊
  searchRules: [...defaultEngine, ...changeArray(getItem('searchRules'))],
  defaultRule: getItem('defaultRule') || 0
};

export default conf;
