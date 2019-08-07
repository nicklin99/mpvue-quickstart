import Router from './router'

export const router = new Router()

export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return router
    }
  })
}
