
import { getQueryString } from '../utils'

const rootPath = 'pages'

export default class Router {
  constructor () {
    this.current = {
      to: {
        basePath: ''
      }
    }
  }

  init (route) {
    if (!this.current.to.basePath) {
      this.current.to.basePath = route.path.replace(rootPath, '').replace('main', '')
      this.current.to.path = route.path
      this.current.to.query = route.query
    }
  }

  changeTab (path) {
    this.current.from = this.current.to
    this.current.to = {
      path: path,
      type: 'tab'
    }
    this.current.to.basePath = this.current.to.path.replace(rootPath, '').replace('main', '')
  }

  push (path, success, fail, complete) {
    this.current.from = this.current.to
    this.current.to = {
      path: this.url(path),
      type: 'page'
    }
    console.log('push', this.current.to)
    this.current.to.basePath = this.current.to.path.replace(rootPath, '').replace('main', '')

    wx.navigateTo({
      url: '/' + this.current.to.path,
      success,
      fail,
      complete
    })
  }

  replace (path, success, fail, complete) {
    this.current.from = this.current.to
    this.current.to = {
      path: '/' + this.url(path),
      type: 'page'
    }
    this.current.to.basePath = this.current.to.path.replace(rootPath, '').replace('main', '')
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
    this.current.to.basePath = this.current.to.path.replace(rootPath, '').replace('main', '')
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
      if (route.path.indexOf('/') !== 0) {
        route.path = this.current.to.basePath.replace(rootPath, '').replace('main', '') + route.path
      }
      url = route.path.indexOf('?') > -1 ? route.path + '&' + getQueryString(route.query) : route.path + '?' + getQueryString(route.query)
    } else {
      if (route.indexOf('/') !== 0) {
        url = this.current.to.basePath.replace(rootPath, '').replace('main', '') + route
      } else {
        url = route
      }
      console.log('parseUrl', this.current.to.basePath, url)
    }

    if (url.indexOf('pages') === 0) {
      return url
    }
    if (url.indexOf('/pages') === 0) {
      return url.replace(/^\//, '')
    }

    url = url.indexOf('?') > -1 ? url.replace('?', '/main?') : url + '/main'

    return rootPath + url
  }
}
