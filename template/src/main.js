{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// mpvue has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import './packages'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import store from './store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import {router} from './packages/router'
import q from './utils/app.controller'
          
Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
App.mpType = 'app'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
App.store = store{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

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
    // 1908 nicklin fix释放掉
    if (callback) {
      callback()
      callback = null
    }
  })
}

const app = new Vue(App)
// nicklin 1908 路由引用下全局app
router.app = app
app.$mount()
