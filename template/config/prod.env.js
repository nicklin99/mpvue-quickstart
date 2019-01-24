const type = process.argv[2]

// 静态资源
let staticUrl = '""'
let apiHost = '""'

switch (type) {
  case 'test':
    staticUrl = '""'
    apiHost = '""'
    break;
  case 'pro':
    staticUrl = '""'
    apiHost = '""'
    break
  default:
    break;
}

module.exports = {
  NODE_ENV: '"production"',
  ENV: '"build"',
  staticUrl: staticUrl,
  baseUrl: apiHost
}
