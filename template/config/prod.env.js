const type = process.argv[2]

// 静态资源
let staticUrl = '""'
let apiHost = '""'
let enableDebug = true
switch (type) {
  case 'test':
    staticUrl = '""'
    apiHost = '""'
    break;
  case 'pro':
    staticUrl = '""'
    apiHost = '""'
    enableDebug = false
    break
  default:
    break;
}

module.exports = {
  NODE_ENV: '"production"',
  ENV: '"build"',
  staticUrl: staticUrl,
  baseUrl: apiHost,
  ENABLE_DEBUG: enableDebug
}
