# mpvue-quickstart

> fork 自 [mpvue/mpvue-quickstart](https://github.com/mpvue/mpvue-quickstart)修改而来。
> fork 自 [vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)修改而来。

## 基本用法

``` bash
$ npm install -g vue-cli
$ vue init nicklin99/mpvue-quickstart my-project
$ cd my-project
$ npm install
$ npm run dev
```

更多详细文档请查阅 [quickstart](http://mpvue.com/mpvue/quickstart/)。

bug 或者交流建议等请反馈到 [mpvue/issues](https://github.com/Meituan-Dianping/mpvue/issues)。

## 模块扩展

### 集成flyio调用http

### 集成 router、toast、modal方法到 Vue.prototype

### 集成 store

> 完成

1. wx.module 微信api集成到store
2. 增加日志插件，记录action、commit的变化
3. store初始化
4. 增加tabBar配置
5. 请求配置

> todo

1. 集成授权方法

## 项目编译扩展

### 对mpvue-loader做了修改

1. 对本地图片和网络图片语法做了区分适配,静态图片请放到static目录下
2. tabbar图片请放到 assets/tabbar文件夹内，tabbar必须走本地图片

### 集成mpvue-config-loader

移除main.json的配置， 到vue文件中配置

1. 这个loader有个bug，配置tabBar.list对象，属性请用双引号

### 生产配置

1. 增加 test、 pro 参数，区分接口url、静态图片url，本地开发默认读取本地的 static目录作为网络静态图
2. 有去要可以增加包的scripts方法,比如 `"build:test": "node build/build.js test wx`, `"build:pro": "node build/build.js pro wx`