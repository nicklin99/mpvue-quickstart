import str from './string.config'

const _session = {

}

const Session = {
  getToken () {
    return this.get('token')
  },
  getUser () {
    return this.get('user')
  },
  get token () {
    return this.getToken()
  },
  setUser (user) {
    this.set('user', user)
  },
  saveUser (_user, _token) {
    const tokenExpireTime = Date.now() + str.api.expireDay * 24 * 60 * 60 * 1000

    this.set('user', _user)
    this.set('token', _token)
    this.set('tokenExpireTime', tokenExpireTime)
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
  set (key, val) {
    _session[key] = val
    wx.setStorageSync(key, val)
  }
}

export default Session
