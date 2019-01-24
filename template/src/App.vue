<script>
/* eslint-disable */
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  },
  // app.json app全局配置
  config: {
    pages: [
      'pages/index/main',
      'pages/request/main'{{#if vuex}},
      'pages/counter/main'
      {{/if}}
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#888',
      selectedColor: '#fa654c',
      backgroundColor: '#fff',
      list: [{
        "pagePath": 'pages/index/main',
        "iconPath": 'assets/tabbar/icon-01.png',
        "selectedIconPath": 'assets/tabbar/icon-01.png',
        "text": '首页'
      },
      {
        "pagePath": 'pages/request/main',
        "iconPath": 'assets/tabbar/icon-01.png',
        "selectedIconPath": 'assets/tabbar/icon-01.png',
        "text": '网络'
      }]
    }
  },
  // 全局组件配置
  globalConfig: {
    usingComponents: {}
  },
  onLaunch (options) {
    options.isLaunch = true
    console.log('app.onLaunch.options', options)
  },
  onShow (options) {
    this.$router.init(options)
    console.log('app.onShow.options', options)
    if (options.isLaunch) {
      console.log('小程序启动')
    } else {
      console.log('小程序后台切前台')
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
