// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)

    this.setData({
      userInfo,
    })
  },

  cleanAllData() {
    try {
      wx.clearStorageSync()
    } catch (e) {
      // Do something when catch error
    }
  },
})
