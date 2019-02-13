// import { LOCAL_HOST as HOST } from './interface.conf';
// DEV_HOST SIT_HOST UAT_HOS
// export const banner = {
//   url: `${HOST}home/banner`,
//   method: 'post'
// };
export const baidu = {
  url: 'http://suggestion.baidu.com/su',
  method: 'get',
  type: 'jsonp'
};
export const getToken = {
  url: 'https://v2.jinrishici.com/token',
  method: 'get'
};
export const jinrishici = {
  url: 'https://v2.jinrishici.com/one.json',
  method: 'get',
  headers: {
    // 'X-User-Token': ''
  }
};

export default {
  baidu,
  getToken,
  jinrishici
};
