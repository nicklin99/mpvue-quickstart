import str from './string.config'

const _session = {

}

const Session = {
  getToken () {
    return this.get('token')
  },
  get user () {
    return this.get('user')
  },
  set user (val) {
    return this.set('user', val)
  },
  get token () {
    return this.getToken()
  },
  set token (val) {
    if (val) {
      const tokenExpireTime = Date.now() + str.api.expireDay * 24 * 60 * 60 * 1000
      this.set('token', val)
      this.set('tokenExpireTime', tokenExpireTime)
    }
  },
  isExpire () {
    return Date.now() > this.get('tokenExpireTime')
  },
  get (key) {
    if (_session[key]) {
      return _session[key]
    } else {
      _session[key] = wx.getStorageSync(key)
      return _session[key]
    }
  },
  set (key, val, cache = true) {
    if (val) {
      _session[key] = val
      if (cache) {
        wx.setStorageSync(key, val)
      }
    } else {
      delete _session[key]
      if (cache) {
        wx.removeStorageSync(key, val)
      }
    }
  }
}

export default Session
