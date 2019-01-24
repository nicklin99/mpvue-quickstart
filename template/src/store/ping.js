import http from '../utils/http'

http.unlock() // 只是为了测试

export default {
  actions: {
    ping () {
      return http.get('http://wxapi.asonweb.com/?action=ping', res => res)
    }
  }
}
