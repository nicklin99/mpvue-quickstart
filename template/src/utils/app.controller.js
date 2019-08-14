
import queue from 'async-es/queue'
import store from '../store'
import { router } from '../packages/router'
import Session from './session'

const tasks = {
  async isLogin(callback) {
    const isAuth = await store.dispatch('isGrantAuth')
    Session.set('isAuth', isAuth, false)
    const isLogin = await store.dispatch('isLogin')

    console.log(`isAuth:${isAuth} isLogin:${isLogin}`)

    if (isAuth && isLogin) {
      store.commit('updateUser', Session.user)
    }

    if (!isAuth && isLogin) {
      await store.dispatch('loginApp')
    }

    callback()
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
  const {name,...params} = task
  tasks[task.name](callback, params)
})

q.error((err, task) => {
  console.log('queue.error', err, task)
})

export default q
