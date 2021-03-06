import http from '../utils/http'
import session from '../utils/session'
import waterfall from 'async-es/waterfall'
import str from '../utils/string.config'

const state = {
  id: 0, // id
  nickname: '', // 昵称
  avatar: '' // 头像
}

const mutations = {
  updateUser(state, user) {
    for (const key in user) {
      state[key] = user[key]
    }
  },
  setUser(state, user) {
    for (const key in user) {
      state[key] = user[key]
    }
    session.user = state
  }
}

const actions = {
  // 是否需要登录
  isLogin() {
    if (session.isExpire()) {
      return false
    }

    if (!session.token) {
      return false
    }

    if (!session.user) {
      return false
    }
    return true
  },
  getUser() {
    return http.get(str.api.userInfo).then(({ data }) => {
      //todo 用户信息
      const user = {
      }
      this.commit('setUser', user)
      return user
    })
  },
  // 发送用户信息获取token
  loginClientUser(store, payload) {
    return http.post(str.api.loginUser, payload).then(({ data, token }) => {
      // todo 登录后用户信息处理
      return {
        user: {
        },
        token
      }
    })
  },
  loginApp({ dispatch, commit }, data) {
    const wxLogin = callback => {
      dispatch('wxlogin').then(code => {
        dispatch('getWxUserInfo', true)
          .then(res => {
            callback(null, {
              code,
              ...res
            })
          })
          .catch(err => {
            callback(err)
            // 这里最好提示下，要完成授权才能进行下一步
          })
      })
    }

    return new Promise((resolve, reject) => {
      // 如果wxlogin失败会导致后面不执行
      waterfall(
        [
          wxLogin,
          (data, callback) => {
            dispatch('loginClientUser', data)
              .then(result => {
                callback(null, result)
              })
              .catch(callback)
          }
        ],
        (err, result) => {
          if (err) {
            console.log('login.fail', err)
            return reject(err)
          } else {
            console.log('login.success')
          }
          const { user, token } = result
          commit('setUser', user)
          session.token = token
          session.set('isAuth', true, false)
          resolve()
        }
      )
    })
  },
  // 是否授权用户信息
  isGrantAuth({ dispatch }) {
    return dispatch('wxGetAuthSetting', 'scope.userInfo')
  }
}

export default {
  state,
  mutations,
  actions
}
