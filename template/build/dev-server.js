require('./check-versions')()

// add nicklin 自动获取本机ip
function getIPAdress(){  
  var interfaces = require('os').networkInterfaces();  
  for(var devName in interfaces){  
        var iface = interfaces[devName];  
        for(var i=0;i<iface.length;i++){  
             var alias = iface[i];  
             if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                   return alias.address;  
             }  
        }  
  }  
}

process.env.PLATFORM = process.argv[process.argv.length - 1] || 'wx'
var config = require('../config')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  // add nicklin 附带环境信息
  process.env.ENV = JSON.parse(config.dev.env.ENV)
  process.env.localIP = getIPAdress()
}

// var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var portfinder = require('portfinder')
var webpackConfig = {{#if_or unit e2e}}(process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : {{/if_or}}require('./webpack.dev.conf')
var utils = require('./utils')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)
if (process.env.PLATFORM === 'swan') {
  utils.writeFrameworkinfo()
}

// var devMiddleware = require('webpack-dev-middleware')(compiler, {
//   publicPath: webpackConfig.output.publicPath,
//   quiet: true
// })

// var hotMiddleware = require('webpack-hot-middleware')(compiler, {
//   log: false,
//   heartbeat: 2000
// })
// force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

// console.log('> Starting dev server...')
// devMiddleware.waitUntilValid(() => {
//   console.log('> Listening at ' + uri + '\n')
//   // when env is testing, don't need open it
//   if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
//     opn(uri)
//   }
//   _resolve()
// })

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = port
  portfinder.getPortPromise()
  .then(newPort => {
      if (port !== newPort) {
        console.log(`${port}端口被占用，开启新端口${newPort}`)
      }
    
    // add nicklin 重新设置端口号，输出url
    const staticUrl = JSON.stringify(`http://${process.env.localIP}:${newPort}/`)
    process.env.staticUrl = config.dev.env.staticUrl = staticUrl
    // for mpvue-loader
    process.env.staticPublicPath = staticUrl
    var server = app.listen(newPort, '0.0.0.0', function () {
        const host = server.address().address
        const port = server.address().port
        console.log('Local:            ', `http://localhost:${port}`)
        console.log('On Your Network:  ', `http://${host}:${port}`)
      })
      // for 小程序的文件保存机制
      require('webpack-dev-middleware-hard-disk')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
      })
      resolve({
        ready: readyPromise,
        close: () => {
          server.close()
        }
      })
  }).catch(error => {
    console.log('没有找到空闲端口，请打开任务管理器杀死进程端口再试', error)
  })
})
