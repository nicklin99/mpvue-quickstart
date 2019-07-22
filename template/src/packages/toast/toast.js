export const toast = (msg, options) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    ...options
  })
}

export const modal = (title, content = '', options) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      ...options,
      success (res) {
        if (res.confirm) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}


export const loading = (visible, title) => {
  if (visible) {
    wx.showLoading({
      title: title || '加载中',
      mask: true
    })
  } else {
    wx.hideLoading()
  }
}