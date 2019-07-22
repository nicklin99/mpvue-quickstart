import Router from './router'
const router = new Router()
export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return router
    }
  })
}
