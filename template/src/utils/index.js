
export const toast = title => {
  wx.showToast({
    title,
    icon: 'none',
    duration: 2000
  })
}

