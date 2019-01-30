import baidu from '../assets/img/logo/baidu.png';
import google from '../assets/img/logo/google.png';
import bying from '../assets/img/logo/bying.png';

const getItem = name => {
  const res = window.localStorage.getItem(name);
  return res || '';
};
const conf = {
  bgimg: getItem('bgimg') || 'https://ws1.sinaimg.cn/large/005O2C54gy1fzopn84ptgj30jg0yl0vh.jpg', // 背景图
  logo: getItem('logo'), // logo
  blur: getItem('blur'), // 模糊
  searchRules: [
    { name: '必应', url: 'https://cn.bing.com/search?q=%s', logo: bying },
    { name: '谷歌', url: 'https://www.google.com/search?q=%s', logo: google },
    { name: '百度', url: 'https://www.baidu.com/s?word=%S', logo: baidu }
  ],
  defaultRule: 1
};

export default conf;
