
import {wxLogin} from "../../utils/utils.js"
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 获取用户信息
   */
  async getUserInfo(e){
    
    //getuserinfo 获取用户信息
    wx.setStorageSync("userInfo", e.detail.userInfo);
    
     //保存token  因为无法获取别人数据库的token 故写死
     wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");

     
    wx.navigateBack({
      delta: 1,
    })
  }

})