import Router from './router'

export default function install (Vue) {
  const router = new Router()
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return router
    }
  })
}
