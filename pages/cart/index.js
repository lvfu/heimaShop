
import {showToast,showModal} from "../../utils/utils.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrs:{},
    carts:[],
    totalPrice:0,
    totalSelect:0,
    selectAllStatus:false

  },

  //购物车全局变量 方便操作数据
  cartsList:[],
  addrsData:{},

  //是否全选
  selectAllStatus:false,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  
  onShow() {
    //获取本地收货地址
    this.addrsData= wx.getStorageSync("rec_addr");
    //获取缓存的购物车数据
    this.cartsList = wx.getStorageSync("carts");

    this.setData({
      addrs:this.addrsData,
      carts:this.cartsList
    })

    //计算底部参数
    this.totalData();
  },

  getWechatAddr(){
    //获取地址
    wx.chooseAddress({
      success: (result) => {
          
          this.setData({
            addrs:result
          })

          //收货地址存储本地
          wx.setStorageSync("rec_addr",result);
            
      }
    });
      

  },


  /**
   * 更新购物车选中状态
   */
  checkBoxChange(e){

    let {position} = e.currentTarget.dataset
   
    this.cartsList[position].isSelect = !this.cartsList[position].isSelect
    this.setData({
      carts:this.cartsList
    })

    //更新底部数据
    this.totalData();
  },

  /**
   * 更新购物车全选逻辑
   */
   checkAllChange(e){

    //反向选择
    this.selectAllStatus = !this.selectAllStatus

    for (var i=0;i<this.cartsList.length;i++){ 
      this.cartsList[i].isSelect = this.selectAllStatus
    }

    this.setData({
      carts:this.cartsList,selectAllStatus:this.selectAllStatus,

    })

    //更新底部数据
    this.totalData();
  },

  /**
   * 购物车数量减
   */
  async shopCartDelTap(e){
    let {operation} = e.currentTarget.dataset;
    let {position} = e.currentTarget.dataset;

    if (this.cartsList[position].cart_num<=1) {

      const res =  await showModal('是否删除商品？');
      if (res.confirm) {
        this.deleteProduce(position);
      } else if (res.cancel) {
        console.log('用户点击取消')
      }

      return
    }
    
    this.cartsList[position].cart_num+=operation

    console.log(this.cartsList[position].cart_num);

    this.setData({
      carts:this.cartsList
    })

    //更新底部数据
    this.totalData();
  },

  /**
   * 购物车数量加
   */
  shopCartAddTap(e){
    let {operation} = e.currentTarget.dataset;
    let {position} = e.currentTarget.dataset;
    
    this.cartsList[position].cart_num+=operation

    console.log(this.cartsList[position].cart_num);

    this.setData({
      carts:this.cartsList
    })

     //更新底部数据
     this.totalData();
  },

  /**
   * 购物车删除商品
   */
  deleteProduce(e){

    this.cartsList.splice(e,1)

    this.setData({
      carts:this.cartsList
    })

    //更新底部数据
    this.totalData();
  },

  /**
   * 购物车数据计算部分
   */
  totalData(){

    let selectNum = 0;
    let totalPrice = 0;

    //全选
    for (var i=0;i<this.cartsList.length;i++){ 
      if (this.cartsList[i].isSelect) {
        selectNum++;
      }
    }

    //恢复全选状态 一般是第一次进来的情况会用到
    if (selectNum===this.cartsList.length) {
      this.selectAllStatus = true
    }

    //全选 删除商品 要重置
    if (selectNum===0) {
      this.selectAllStatus = false

    }else {

        //价格求和
      totalPrice = this.cartsList.reduce((prev,next)=>{

        if (next.isSelect) {
          return prev+(next.goods_price * next.cart_num)
        }else{
          return prev+0
        }
      },0)

    }
  
    //设置数据
    this.setData({
      totalSelect:selectNum, totalPrice,selectAllStatus:this.selectAllStatus
    })


    //保存数据
    wx.setStorageSync("carts",this.cartsList)
  },


  /**
   * 结算
   */
  async shopCartSubmitTap(){

   //判断收货地址
   if (!this.addrsData.userName) {
      await showToast("你还没有选择收获地址")
      return
   }

    //判断商品
    if (this.data.totalSelect===0) {
      await showToast("你还没有选择商品")
      return
    }

    wx.navigateTo({
      url: '/pages/pay/index'
    });
      

  }

  
})