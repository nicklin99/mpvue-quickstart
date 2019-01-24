
import { getQueryString } from '../utils'

const rootPath = '/pages'

export default class Router {
  constructor () {
    this.current = {
      to: {}
    }
  }

  changeTab (path) {
    this.current.from = this.current.to
    this.current.to = {
      path: '/' + path,
      type: 'tab'
    }
  }

  push (path, success, fail, complete) {
    this.current.from = this.current.to
    this.current.to = {
      path: this.url(path),
      type: 'page'
    }
    wx.navigateTo({
      url: this.current.to.path,
      success,
      fail,
      complete
    })
  }

  replace (path, success, fail, complete) {
    this.current.from = this.current.to
    this.current.to = {
      path: this.url(path),
      type: 'page'
    }
    wx.redirectTo({
      url: this.current.to.path,
      success,
      fail,
      complete
    })
  }

  tab (path, success, fail, complete) {
    this.current.from = this.current.to
    this.current.to = {
      path: this.url(path),
      type: 'tab'
    }

    wx.switchTab({
      url: this.current.to.path,
      success,
      fail,
      complete
    })
  }

  back (step, success, fail, complete) {
    const from = this.current.from
    this.current.from = this.current.to
    this.current.to = from

    wx.navigateBack({
      delta: step || 1,
      success,
      fail,
      complete
    })
  }

  url (route) {
    let url
    if (typeof route === 'object') {
      url = route.path.indexOf('?') > -1 ? route.path + '&' + getQueryString(route.query) : route.path + '?' + getQueryString(route.query)
    } else {
      url = route
    }

    if (url.indexOf('pages') === 0) {
      return '/' + url
    }
    if (url.indexOf('/pages') === 0) {
      return url
    }

    url = url.indexOf('?') > -1 ? url.replace('?', '/main?') : url + '/main'

    return rootPath + url
  }
}
