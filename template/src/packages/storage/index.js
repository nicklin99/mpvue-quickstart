export default {
  setItem (key, value) {
    return wx.setStorageSync(key, value)
  },
  getItem (key) {
    return wx.getstorageSync(key)
  }
}
