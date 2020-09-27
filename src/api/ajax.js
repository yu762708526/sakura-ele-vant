/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
import qs from 'qs'
// 导入NProgress包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 环境的切换

// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
  // case 'test':
  //   axios.defaults.baseURL = '/api'
  //   break
  case 'production':
    axios.defaults.baseURL = 'http://121.41.229.155/host/'
    break
  default:
    axios.defaults.baseURL = '/api'
    break
}
// 设置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

// 不要求可以不设置
// post请求的时候，设置请求传递数据得格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = params => qs.stringify(params) // 把对象变成字符串  只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 展示进度条
  NProgress.start()
  // 在发送请求之前做些什么
  // 携带token
  // token校验(JWT):接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该把token带上
  const token = window.sessionStorage.getItem('token')
  token && (config.headers.Authorization = token)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// // 自定义响应成功的HTTP状态码
// // 一般公司不用
// // axios.get('/user/12345', {
// //   validateStatus: function (status) {
// //     return /^(2|3)\d{2}$/.test(status) // 状态码在200-300时才会 reject
// //   }
// // })

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 隐藏进度条
  NProgress.done()
  // 对响应数据做点什么
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  const { response } = error
  // 对响应错误做点什么
  if (response) {
    // 服务器起码返回了结果
    switch (response.status) {
      case 401:
        break
      case 403:
        break
      case 404:
        break
    }
  } else {
    // 服务器连结果都没有返回
    if (!window.navigator.onLine) {
      // 断网处理:可以跳转到断网页面
      return
    }
    return Promise.reject(error.response)
  }
})
export default function ajax (url, params = {}, type = '') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'get') {
      promise = axios.get(url, { params: params })
    } else if (type === 'post') {
      promise = axios.post(url, params)
    }
    promise.then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
