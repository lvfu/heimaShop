
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
    const{encryptedData,rawData,iv,signature}= e.detail;

    //wx.login 获取code
    const loginData = await wxLogin();
    const{code}= loginData

    //请求参数
    const queryParamas = {encryptedData,rawData,iv,signature,code}
    

    //获取token
    const result = await request({ url: '/users/wxlogin',data:queryParamas});
    console.log(result);
    
    
    // let {token} =  result.message

    //保存token  因为无法获取别人数据库的token 故写死
    wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");

    //返回上一层
    wx.navigateBack({
      delta: 1
    });
        
  }

})