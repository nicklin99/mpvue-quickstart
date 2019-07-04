import http from '../utils/http'

export default {
  actions: {
    ping () {
      return http.get('http://wxapi.asonweb.com/?action=ping', res => res)
    }
  }
}
