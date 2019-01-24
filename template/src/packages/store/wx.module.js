const scopes = {
  writePhotosAlbum: 'scope.writePhotosAlbum'
}
const actions = {
  wxGetAuthSetting ({commit}, key) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success (res) {
          if (res.authSetting[key]) {
            resolve()
          } else {
            const msg = 'need grant auth'
            console.error(msg)
            reject(new Error(msg))
          }
        }
      })
    })
  },
  /**
   * 是否带上登录态信息。当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；
   * 当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。
   */
  getWxUserInfo ({commit, dispatch}, payload) {
    const withCredentials = !!payload
    const lang = 'zh_CN'
    return new Promise(resolve => {
      wx.getUserInfo({
        withCredentials,
        lang,
        success: res => {
          console.log('[已授权]wx.getUserInfo.获取用户信息', res)
          commit('loginWxUser', res.userInfo)

          // 获取openid
          if (withCredentials) {
            const {rawData, signature, encryptedData, iv} = res
            resolve({
              rawData,
              signature,
              encryptedData,
              iv
            })
          } else {
            resolve(res.userInfo)
          }
        }
      })
    })
  },
  getWxphone ({ commit, dispatch }, payload) {
    return new Promise(resolve => {
      wx.checkSession({
        success (res) {
          resolve(res)
          // session_key 未过期，并且在本生命周期一直有效
        },
        fail (e) {
          // session_key 已经失效，需要重新执行登录流程
          console.log(e)
          return dispatch('wxlogin')
        }
      })
    })
  },
  wxlogin () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          if (res.code) {
            resolve(res.code)
          } else {
            reject(new Error('wx.login error'))
          }
        }
      })
    })
  },
  wxDownloadFile (store, url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            resolve(res.tempFilePath)
          } else {
            reject(new Error('download file error'))
          }
        }
      })
    })
  },
  wxGetImageData ({dispatch}, src) {
    if (typeof src === 'string') {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src,
          success: resolve,
          fail: reject
        })
      })
    } else {
      return Promise.all(src.map(url => {
        return dispatch('wxGetImageData', url)
      }))
    }
  },
  wxCanvasToTempFilePath (store, options) {
    if (!options) {
      options = {}
    }
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        ...options,
        success: res => {
          resolve(res.tempFilePath)
        },
        fail: reject
      })
    })
  },
  wxSaveImageToPhotosAlbum (store, filePath) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success (res) {
          if (!res.authSetting[scopes.writePhotosAlbum]) {
            wx.authorize({
              scope: scopes.writePhotosAlbum,
              success () {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                wx.saveImageToPhotosAlbum({
                  filePath,
                  success: resolve,
                  fail: reject
                })
              },
              fail: e => {
                // {errMsg:''}
                e.message = '拒绝了保存到相册授权，无法保存'
                reject(e)
              }
            })
          } else {
            wx.saveImageToPhotosAlbum({
              filePath,
              success: resolve,
              fail: reject
            })
          }
        }
      })
    })
  },
  wxGetAddress (store) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success (res) {
          if (!res.authSetting['scope.address']) {
            wx.authorize({
              scope: 'scope.address',
              success () {
                // 用户已经同意小程序使用获取地址功能，后续调用 wx.chooseAddress 接口不会弹窗询问
                wx.chooseAddress({
                  success: resolve,
                  fail: reject
                })
              },
              fail: e => {
                // {errMsg:''}
                e.message = '用户不允许获取地址'
                reject(e)
              }
            })
          } else {
            wx.chooseAddress({
              success: resolve,
              fail: reject
            })
          }
        }
      })
    })
  },
  tabBar ({ commit }, bool) {
    commit('tabBar', bool)
    if (bool) {
      wx.showTabBar()
    } else {
      wx.hideTabBar()
    }
  }
}

const state = {
  system: {},
  tabBar: true
}

const mutations = {
  system (state, system) {
    Object.assign(state.system, system)
  },
  tabBar (state, bool) {
    state.tabBar = bool
  }
}

export default {
  actions,
  state,
  mutations
}
