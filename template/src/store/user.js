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
  setUser (state, user) {
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        state[key] = user[key]
      }
    }
  }
}

const actions = {
  // 是否需要登录
  isLogin () {
    if (session.isExpire()) {
      return false
    }

    if (!session.token) {
      return false
    }

    if (!session.getUser()) {
      return false
    }
    return true
  },
  getSessionUser () {
    const user = session.getUser()
    this.commit('setUser', user)
  },
  getUser () {
    return http.get(str.api.userInfo).then(({ data }) => {
      //todo 用户信息
      const {} = data
      const user = {
      }
      this.commit('setUser', user)
      session.setUser(user)
      return user
    })
  },
  // 发送用户信息获取token
  loginClientUser (store, payload) {
    return http.post(str.api.loginUser, payload).then(({ data, token }) => {
      // id (integer, optional): id ,
      // img (string, optional): 头像 ,
      // nick (string, optional): 昵称
      const { id, img, nick } = data
      return {
        user: {
          id,
          nickname: nick,
          avatar: img
        },
        token
      }
    })
  },
  loginApp ({ dispatch, commit }, data) {
    const wxLogin = callback => {
      dispatch('wxlogin').then(code => {
        if (data) {
          callback(null, {
            code,
            ...data
          })
        } else {
          dispatch('getWxUserInfo', true)
            .then(res => {
              // callback(new Error('loginFail'))
              callback(null, {
                code,
                ...res
              })
            })
            .catch(err => {
              callback(err)
              // 这里最好提示下，要完成授权才能进行下一步
            })
        }
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
          session.saveUser(user, token)
          resolve()
        }
      )
    })
  },
  // 是否授权用户信息
  isGrantAuth ({ dispatch }) {
    return dispatch('wxGetAuthSetting', 'scope.userInfo')
  }
}

export default {
  state,
  mutations,
  actions
}
