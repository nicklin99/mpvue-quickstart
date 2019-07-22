import {toast, modal, loading} from './toast'

export default function install (Vue) {
  Vue.prototype.$toast = toast
  Vue.prototype.$modal = modal
  Vue.prototype.$loading = loading
}
