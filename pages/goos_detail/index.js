//0 导入请求js
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsObj:{}
  },

  QuereParamas:{
    goods_id:0
  },

  /**
   * 商品详情数据
   */
  GoodsInfo:{
    //加入购物车数量
    cart_num:0,
    //购物车里的选中状态
    isSelect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.QuereParamas.goods_id = options.goods_id

    this.getGoodsDetail();
  },


  /**
   * 获取详情数据
   */
  async getGoodsDetail(){
    const res =  await request({url:"/goods/detail",data:this.QuereParamas})
   
    this.GoodsInfo = res.data.message

    console.log(res);
    
    this.setData({
      goodsObj : {
        pics:res.data.message.pics,
        pics_mid_url:res.data.message.pics_mid_url,
        goods_price:res.data.message.goods_price,
        goods_name:res.data.message.goods_name,
        goods_introduce:res.data.message.goods_introduce
      }
    })
  },


  /**
   * 展示大图
   */
  handleClickImgTap(e){
   const urls = this.GoodsInfo.pics.map(v=>v.pics_mid_url);

   const {url} = e.currentTarget.dataset

   wx.previewImage({
    current: url,
    urls: urls
   });
     
  },

  /**
   * 加入购物车
   */
  handleClickAddCart(){
    let carts = wx.getStorageSync("carts")||[];
    

    let index = carts.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)

    if (index===-1) {
      this.GoodsInfo.cart_num=1
      carts.push( this.GoodsInfo)
      
    }else{
      carts[index].cart_num++
    }

    wx.setStorageSync("carts",carts)

    wx.showToast({
      title: '加入购物车成功',
      duration: 1500,
      mask: true
    });
      
  }

})