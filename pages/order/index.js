import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[{
      id:1,
      title:"全部",
      isSelect:false
    },{
      id:2,
      title:"待付款",
      isSelect:false
    },{
      id:3,
      title:"代发货",
      isSelect:false
    },{
      id:4,
      title:"退款/退货",
      isSelect:false
    }],

    orders:[]
  },

  type:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let pages =  getCurrentPages();
    let nowPage = pages[pages.length-1];
    this.type = nowPage.options.type;

    //看看应该复选哪个tab
    let {tabList} =  this.data;

    tabList.forEach((v,i) => {

      v.isSelect = (i===(this.type-1)?true:false)
    });

    console.log(tabList);

    this.setData({
      tabList
   })
      
    this.getOrderList();
  },

  /**
   * 订单列表
   */
  async getOrderList(){
    const token =  wx.getStorageSync("token");
    const header = {Authorization:token};

    const result =  await request({url:"/my/orders/all",data:{type:this.type},header})

    let {orders} = result.data.message;

    this.setData({orders})
  },

  /**
   * tab切换
   * @param {*} e 
   */
  tabChangeListener(e){
    
   let {index} = e.detail;
   let {id} = e.detail;

    
   let {tabList} =  this.data;

   tabList.forEach((v,i) => {
      v.isSelect = (i===index?true:false)
   });

   this.type = id

   this.setData({
      tabList
   })

   //获取数据
   this.getOrderList();
  },


  /**
   * 下拉刷新
   */
  onPullDownRefresh(){
    
    this.setData({
      orders:[]
    });

    this.getOrderList();

    wx.stopPullDownRefresh();
      
  }

})