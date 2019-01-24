import {toast, modal} from './toast'

export default function install (Vue) {
  Vue.prototype.$toast = toast
  Vue.prototype.$modal = modal
}
