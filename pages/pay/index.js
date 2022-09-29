
import {showToast,showModal,wxPay} from "../../utils/utils.js"
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrs:{},
    carts:[],
    totalPrice:0,
    totalSelect:0

  },

  addrAll:"",

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
    const addrsData= wx.getStorageSync("rec_addr");
    this.addrAll = addrsData.provinceName+addrsData.cityName+addrsData.countyName+addrsData.detailInfo;

    //获取缓存的购物车数据
    const cartList = wx.getStorageSync("carts");
    //过滤购物车中选中的数据
    let payList = cartList.filter(v=>v.isSelect);

    this.setData({
      addrs:addrsData,
      carts:payList
    })

    //计算底部参数
    this.totalData();
  },


  /**
   * 购物车数据计算部分
   */
  totalData(){

    let selectNum = 0;
    let totalPrice = 0;

    //全选
    for (var i=0;i<this.data.carts.length;i++){ 
      if (this.data.carts[i].isSelect) {
        selectNum++;
      }
    }


    if (selectNum!==0) {
        //价格求和
        totalPrice = this.data.carts.reduce((prev,next)=>{

          if (next.isSelect) {
            return prev+(next.goods_price * next.cart_num)
          }else{
            return prev+0
          }
        },0)
    }
  
    //设置数据
    this.setData({
      totalSelect:selectNum, totalPrice,
    })

  },


  /**
   * 结算
   */
 async shopCartSubmitTap(){
      const token =  wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })

        return
      }


      try {
        
        //有token拼接参数
        const header = {Authorization:token};
        const order_price = this.data.totalPrice;
        const consignee_addr = this.addrAll;

        let goods=[];
        const carts =  this.data.carts;
        carts.forEach(v => {
          goods.push({goods_id:v.goods_id,goods_number:v.goods_number,goods_price:v.goods_price})
        });

        const paramas = {order_price,consignee_addr,goods}

        //提交订单
        const result = await request({ url: '/my/orders/create',data:paramas,header:header,method:"POST"});
        const {order_number} =  result.data.message
        
        //拿订单号获取支付参数
        const result1 = await request({ url: '/my/orders/req_unifiedorder',data:{order_number:order_number},header:header,method:"POST"});
        
        //获取pay参数
        const {pay} = result1.data.message
      
        //支付
        const wxPayResult =   await wxPay(pay);
        console.log(wxPayResult);

        //移除已支付的购物车数据
        const cartList = wx.getStorageSync("carts");
        const newCartList =  cartList.filter(v=>!v.isSelect)
        wx.setStorageSync("carts",newCartList);


        await showToast("支付成功")
        //跳转订单页面
        wx.navigateBack({
          delta: 1
        });
         
          

      } catch (error) {

        //移除已支付的购物车数据
        const cartList = wx.getStorageSync("carts");
        const newCartList =  cartList.filter(v=>!v.isSelect)
        wx.setStorageSync("carts",newCartList);           

        await showToast("支付失败")
         //跳转订单页面
         wx.navigateBack({
          delta: 1
        });

      }
     
        
  }

  
})