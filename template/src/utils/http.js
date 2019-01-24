import { apiSettings, toast } from './index'
const Fly = require('flyio/dist/npm/wx')

// 不需要授权的接口
const authUrl = apiSettings.authUrl
// 授权令牌
let csrfToken = ''
let userId = 0
let _multiFlag = false // post防重
const isEnableMultiFlag = false // 是否启用全局POST防重

/**
 * Http客户端，实例化2个
 * 1. fly 默认
 * 2. request 用于发起请求获取请求授权令牌
 */

const fly = new Fly()
const request = new Fly()

/**
 * 设置客户端
 */

// 公共headers
fly.config.headers = {
  'X-Tag': 'flyio'
}
// 超时10s
fly.config.timeout = 10000
// 设置请求基地址
fly.config.baseURL = apiSettings.baseUrl
request.config.baseURL = apiSettings.baseUrl
// fly.config.withCredentials = true

// 发起请求前携带授权令牌
function onRequest (config) {
  // fix post防重
  if (isEnableMultiFlag) {
    if (config.method === 'POST') {
      fly.interceptors.request.lock()
      if (_multiFlag) {
        return null
      }
      _multiFlag = true
    }
  }
  console.log(`${config.method}发起请求：path:${config.url}，baseURL:${config.baseURL}`)
  // console.log(`${config.method}发起请求：${csrfToken}`)
  if (config.headers.test) {
    return config
  }

  if (csrfToken) {
    config.headers['token'] = csrfToken
  }

  return config
}
// 添加请求拦截器
fly.interceptors.request.use(onRequest)

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
const onResponse = res => {
  console.log('req', res.request.baseURL + res.request.url)
  console.log('res', res)

  // fix post防重
  if (isEnableMultiFlag && _multiFlag) {
    fly.interceptors.request.clear()
    fly.interceptors.request.unlock()
    _multiFlag = false
  }

  // 更新令牌
  if (res.headers.token) {
    csrfToken = res.headers.token[0]
  }
  // 特殊处理
  if (res.request.url === authUrl) {
    res.data.token = csrfToken
    userId = res.data.data
  }

  if (res.data.code < 400 || (typeof res.data === 'string')) {
    return res.data
  } else {
    toast(res.data.message)
    console.log('[http.api.reject]', res)
    return Promise.reject(res)
  }
}
// 添加客户端响应拦截器
fly.interceptors.response.use(onResponse,
  function (err) {
    console.log('err', err)
    // 更新令牌
    if (err.response.headers.token) {
      csrfToken = err.response.headers.token[0]
    }

    // Do something with request error
    toast('网络错误，请稍后重试')

    if (err.response.status === 501) {
      fly.lock()
      request.get(apiSettings.refreshTokenUrl, { userId }).then(d => {
        csrfToken = d.data.token
        fly.unlock()
      })
    }

    return Promise.reject(err)
  }
)
request.interceptors.response.use(onResponse)
request.interceptors.request.use(function (config) {
  if (csrfToken) {
    config.headers['token'] = csrfToken
  }
  return config
})
// 不管怎么样，默认先锁上，后续请求会进入队列排队，解锁后会再执行队列请求
fly.lock()
export default fly
export { request }
