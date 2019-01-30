import axios from 'axios';
import qs from 'qs';
// import toast from '../../components/toast/src/main';

import './interceptors';
import './jsonp';

const config = {
  method: 'get',
  url: '/',
  timeout: 10000,
  responseType: 'json',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
};
/**
 * 请求封装
 * @param {Object} opt 请求配置
 * @param {Object} data 参数
 * @param {Blooean} isQs 是否qs格式化参数
 */
const http = async (opt, data = {}, isQs = true) => {
  opt = Object.assign({}, config, opt);
  if (opt.type === 'jsonp') {
    return axios.jsonp(opt.url, data);
  }
  if (opt.method.toLowerCase() === 'get') {
    opt.params = Object.assign(data);
  } else {
    opt.data = isQs ? qs.stringify(data) : data;
  }
  const res = await axios(opt);
  return Promise.resolve(res.data);
};

export default http;
