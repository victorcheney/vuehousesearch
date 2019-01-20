import axios from 'axios';
// import { resolve } from 'q';

let cancel, promiseArr = {};

// const CancelToken = axios.CancelToken;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 发起请求时，取消正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('取消操作');
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }

    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 错误处理
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未授权,请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '资源未找到';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 500:
          error.message = '服务器错误';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      } 
    } else {
      error.message = "连接到服务器失败"
    }
    
  }
)

axios.defaults.baseURL = '';
// 设置请求头
axios.defaults.headers = {
  'X-Request-With': 'XMLHttpRequest'
};
axios.defaults.timeout = 10000;

export default {
  // get方法
  fetch(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url,
        params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
    })
  },

  // Post方法
  // get方法
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url,
        params
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
    })
  }
}
