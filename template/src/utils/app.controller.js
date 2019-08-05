
import queue from 'async-es/queue'
import store from '../store'
import { router } from '../packages/router'


const tasks = {
  async isLogin(callback) {
    const isAuth = await store.dispatch('isGrantAuth')
    const isLogin = await store.dispatch('isLogin')

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
  tasks[task.name](callback)
})

q.error((err, task) => {
  console.log('queue.error', err, task)
})

export default q
