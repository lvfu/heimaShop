// pages/category/index.js

//0 导入请求js
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    leftMenuList:[],
    rightMenuList:[],
    currentIndex:0,
    scrollTop:0

  },

  //数据源
  menuList:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {


    //缓存数据
    const Cates =  wx.getStorageSync("cates");
  
    if(!Cates){

      //没缓存请求数据
      this.getCategoryList();

    }else{

      //有缓存判断是否过期
      if (Date.now()-Cates.time>1000 * 60 * 5) {
        //过期了 重新加载
        this.getCategoryList();

      }else{

        if (Cates.data==null) {
          this.getCategoryList();
        }else{
          this.menuList=Cates.data
          //数据分类
          let leftMenuList = this.menuList.map(v=>v.cat_name)
          let rightMenuList = this.menuList[0].children
  
          this.setData({
            leftMenuList,rightMenuList
          })

        }
      }
    }
  },


    //获取分类
  async getCategoryList(){

    const result = await request({ url: '/categories'});
    this.menuList=result.data.message

    //缓存数据
    wx.setStorageSync("cates", {time:Date.now(),data:result.data.message});
    
    //数据分类
    let leftMenuList = this.menuList.map(v=>v.cat_name)
    let rightMenuList = this.menuList[0].children

    this.setData({
      leftMenuList,rightMenuList
    })
  },

  /**
   * 点击事件
   */
  handlerBindTap(e){

    console.log(e);

    const index =  e.currentTarget.dataset.index
    let rightMenuList = this.menuList[index].children

    this.setData({
      currentIndex: index,
      rightMenuList,
      scrollTop:0
    })

   

  }
 
})

