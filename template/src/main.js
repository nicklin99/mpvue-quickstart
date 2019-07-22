{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// mpvue has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import './packages'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import store from './store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
App.mpType = 'app'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
App.store = store{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
if (process.env.NODE_ENV!=='production') {
  wx.setEnableDebug({
    enableDebug: true
  })
}
if (process.env.ENABLE_DEBUG) {
  wx.setEnableDebug({
    enableDebug: true
  })
}
Vue.prototype.onload = function (callback) {
  if (q.next) {
    q.next()
    return false
  }
  const page = this.$mp.page.route
  q.push({name: 'complete', page})
  q.drain(() => {
    console.log(`queue.alldone.${page}`)
    callback && callback()
  })
}

const app = new Vue(App)
app.$mount()
