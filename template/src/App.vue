<script>
/* eslint-disable */
export default {
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
    console.log('app.onShow.options', options)
    if (options.isLaunch) {
      console.log('小程序启动')
    } else {
      console.log('小程序后台切前台')
    }
  },
  created () {}
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
