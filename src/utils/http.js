// /**
//  * Created by admin on 2017/4/25.
//  */
// import axios from 'axios';
// import store from '../store';
// import { getToken } from '@/utils/storage';
// import { deepFreeze, generateSign } from '@/utils';
// import { Message } from 'element-ui';
// import Api from '@/api';
//
// import pickBy from 'lodash/pickBy';
// import isNaN from 'lodash/isNaN';
// import isNil from 'lodash/isNil';
//
// const TOKEN_KEY = 'X-ACCESS-TOKEN';
// const E_KEY = 'X-ACCESS-E-KEY';
// const HEADER_SIGN = 'X-ACCESS-SIGN';
//
// function identity (o) {
//   return !isNil(o) && !isNaN(o);
// }
//
// /**
//  * 关闭加载
//  * @returns {*}
//  */
// function closeLoading () {
//   store.dispatch('CloseLoading');
//   return false;
// }
//
// // 全局配置
// axios.defaults.baseURL = process.env.BASE_API;
// // axios.defaults.baseURL = 'http://192.168.1.11:1800/inx';
// axios.defaults.headers = {
//   // 'X-ACCESS-TOKEN': AUTHENTICATION_KEY
// };
// axios.defaults.withCredentials = true;
// axios.defaults.timeout = process.env.REQUEST_TIMEOUT;
// axios.defaults.proxy = false;
//
// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   if (store.getters.token) {
//     // 让每个请求携带自定义token 请根据实际情况自行修改
//     config.headers[TOKEN_KEY] = getToken();
//   }
//
//   const eKey = [store.getters.userId, store.getters.enterpriseId].join('');
//   if (eKey.length) {
//     config.headers[E_KEY] = eKey;
//   }
//
//   // 参数签名
//   config.headers[HEADER_SIGN] = generateSign({
//     ...pickBy(config.params, identity),
//     ...pickBy(config.data, identity)
//   });
//
//   return config;
// }, function (error) {
//   closeLoading();
//   // for debug
//   // console.log(error);
//   // Do something with request error
//   return Promise.reject(error);
// });
//
// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   setTimeout(function () {
//     closeLoading();
//   }, 500);
//   const res = response.data;
//
//   // if the custom code is not 20000, it is judged as an error.
//   if (res.errno !== 0) {
//     Message.closeAll();
//     Message({
//       message: res.msg || 'Error',
//       type: 'error',
//       duration: 5 * 1000
//     });
//
//     // 100003: Token expired;
//     if (res.errno === 100003) {
//       // to re-login
//       store.dispatch('ResetToken').then(() => {
//         location.reload();
//       });
//     }
//
//     return Promise.reject(new Error(res.msg || 'Error'));
//   } else {
//     return deepFreeze(res.data);
//   }
// }, function (error) {
//   closeLoading();
//   // for debug
//   console.log('err: ' + error);
//   Message.closeAll();
//   // Do something with response error
//   if (error.response) {
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     });
//     return Promise.reject(error.response.data || error);
//   } else if (error.message.includes('timeout')) {
//     Message({
//       message: '网络超时',
//       type: 'error',
//       duration: 5 * 1000
//     });
//     return Promise.reject(new Error('网络超时'));
//   } else {
//     Message({
//       message: '网络异常',
//       type: 'error',
//       duration: 5 * 1000
//     });
//     return Promise.reject(new Error('网络异常'));
//   }
// });
//
// // axios
// export const http = {
//   get (url = '', params = {}) {
//     const cb = arguments[arguments.length - 1];
//     if (arguments.length > 2 && typeof cb === 'function') {
//       return axios({
//         method: 'get',
//         url,
//         params: pickBy(params, identity)
//       }).then(function (result) {
//         cb(null, result);
//       }).catch(function (err) {
//         cb(err, null);
//       });
//     } else {
//       return axios({
//         method: 'get',
//         url,
//         params: pickBy(params, identity)
//       });
//     }
//   },
//   post (url = '', data = {}) {
//     const cb = arguments[arguments.length - 1];
//     if (arguments.length > 2 && typeof cb === 'function') {
//       return axios({
//         method: 'post',
//         url,
//         data: pickBy(data, identity)
//       }).then(function (result) {
//         cb(null, result);
//       }).catch(function (err) {
//         cb(err, null);
//       });
//     } else {
//       return axios({
//         method: 'post',
//         url,
//         data: pickBy(data, identity)
//       });
//     }
//   },
//   all (arr) {
//     return axios.all(arr).then(axios.spread((...args) => args));
//   },
//   /**
//    * Syntactic sugar for invoking a function and expanding an array for arguments.
//    *
//    * Common use case would be to use `Function.prototype.apply`.
//    *
//    *  ```js
//    *  function f(x, y, z) {}
//    *  var args = [1, 2, 3];
//    *  f.apply(null, args);
//    *  ```
//    *
//    * With `spread` this example can be re-written.
//    *
//    *  ```js
//    *  spread(function(x, y, z) {})([1, 2, 3]);
//    *  ```
//    *
//    * @param {Function} callback
//    * @returns {Function}
//    */
//   spread (callback) {
//     return function wrap (arr) {
//       return callback.apply(null, arr);
//     };
//   }
// };
//
// export const api = Api;
//
// export const headers = function () {
//   return {
//     [TOKEN_KEY]: getToken()
//   };
// };
//
// export const request = axios;
//
// // Use http.js
// // import { http, api } from 'http.js
// export default { http, api };
