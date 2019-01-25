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
