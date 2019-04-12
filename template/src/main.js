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

const app = new Vue(App)
app.$mount()
