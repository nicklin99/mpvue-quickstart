
import queue from 'async-es/queue'
import store from '../store'
import { router } from '../packages/router'


const tasks = {
  isLogin(callback) {
    // 是否登录
    store.dispatch('isLogin').then(loginSuccess => {
      if (loginSuccess) {
        // 来自小程序唤起
        // todo 从缓存中读取用户信息
        callback()
      } else {
        store.dispatch('isGrantAuth').then(() => {
          store.dispatch('loginApp').then(callback)
        }).catch(() => {
          router.replace('/auth')
          /* eslint-disable */
          callback('login.auth')
        })
      }
    })
  },
  complete(callback) {
    console.log('runTask.complete.route',router.current.to.path);
    if (router.current.to.path.indexOf(task.page) > -1) {
      callback()
    } else {
      q.next = () => {
        callback()
        q.next = null
      }
    }
  }
}

const q = queue((task, callback) => {
  console.log('queue.workder.runTask', task)
  tasks[task.name](callback)
})

q.error((err, task) => {
  console.log('queue.error', err, task)
})

export default q
