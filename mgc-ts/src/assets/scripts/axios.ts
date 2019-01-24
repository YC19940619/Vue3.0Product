import Axios from 'axios'
import Store from '@/store'
import qs from 'qs'
import { Message } from 'element-ui'
// Axios.defaults.baseURL = process.env.API_URL;//其他地方请求地址可以省略域名
// Axios.defaults.headers.common['Authorization'] = '123'//  第三方认证涉及到token 如果没有可以干掉
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'// 全局设置post请求的数据编码格式
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // if(store.getters.token){
  //   config.headers['TOKEN']=getCookie('TOKEN')
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加接受拦截器
Axios.interceptors.response.use(response => {
  // 在这里你可以判断后台返回数据携带的请求码
  return response
}, function (err) {
  console.log(err)
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误(400)'
        break
      case 401:
        err.message = '未授权，请重新登录(401)'
        break
      case 403:
        err.message = '拒绝访问(403)'
        break
      case 404:
        err.message = '请求出错(404)'
        break
      case 408:
        err.message = '请求超时(408)'
        break
      case 500:
        err.message = '服务器错误(500)'
        break
      case 501:
        err.message = '服务未实现(501)'
        break
      case 502:
        err.message = '网络错误(502)'
        break
      case 503:
        err.message = '服务不可用(503)'
        break
      case 504:
        err.message = '网络超时(504)'
        break
      case 505:
        err.message = 'HTTP版本不受支持(505)'
        break
      default:
        err.message = `连接出错(${err.response.status})!`
    }
  } else {
    err.message = '连接服务器失败!'
  }
  Message.error(err.message)
  return Promise.reject(err)
})

export const $get = (url:string, params:object, token:boolean = false):Promise<any> => {
  // console.log(arguments)
  const config:any = { method: 'get', url, params }
  if (config.headers) {} else {
    config.headers = {}
  }
  if (token) {
    config['headers']['Authorization'] = `Bearer ${Store.state.token.access_token}`
  }
  return new Promise((resolve, reject) => {
    Axios(config).then(res => { // axios返回的是一个promise对象
      resolve(res.data)// resolve在promise执行器内部
    }).catch(err => {
      console.log(err, '异常')
    })
  })
}

export const $post = (url:string, data:object, token:boolean = false):Promise<any> => {
  const config:any = { method: 'post', url, data: qs.stringify(data) }
  if (config.headers) {} else {
    config.headers = {}
  }
  if (token) {
    config['headers']['Authorization'] = `Bearer ${Store.state.token.access_token}`
  }
  return new Promise((resolve, reject) => {
    Axios(config).then(res => { // axios返回的是一个promise对象
      resolve(res.data)// resolve在promise执行器内部
    }).catch(err => {
      console.log(err, '异常')
    })
  })
}

export const $patch = (url:string, data:object, token:boolean = false):Promise<any> => {
  const config:any = { method: 'patch', url, data: qs.stringify(data) }
  if (config.headers) {} else {
    config.headers = {}
  }
  if (token) {
    config['headers']['Authorization'] = `Bearer ${Store.state.token.access_token}`
  }
  return new Promise((resolve, reject) => {
    Axios(config).then(res => { // axios返回的是一个promise对象
      resolve(res.data)// resolve在promise执行器内部
    }).catch(err => {
      console.log(err, '异常')
    })
  })
}

export const $delete = (url:string, data:object, token:boolean = false):Promise<any> => {
  const config:any = { method: 'delete', url, data: qs.stringify(data) }
  if (config.headers) {} else {
    config.headers = {}
  }
  if (token) {
    config['headers']['Authorization'] = `Bearer ${Store.state.token.access_token}`
  }
  return new Promise((resolve, reject) => {
    Axios(config).then(res => { // axios返回的是一个promise对象
      resolve(res.data)// resolve在promise执行器内部
    }).catch(err => {
      console.log(err, '异常')
    })
  })
}

export const $put = (url:string, data:object, token:boolean = false):Promise<any> => {
  const config:any = { method: 'put', url, data: qs.stringify(data) }
  if (config.headers) {} else {
    config.headers = {}
  }
  if (token) {
    config['headers']['Authorization'] = `Bearer ${Store.state.token.access_token}`
  }
  return new Promise((resolve, reject) => {
    Axios(config).then(res => { // axios返回的是一个promise对象
      resolve(res.data)// resolve在promise执行器内部
    }).catch(err => {
      console.log(err, '异常')
    })
  })
}
