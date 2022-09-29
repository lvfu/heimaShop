//0 导入请求js
import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabDatas: [
      {
        id: 0,
        title: '综合',
        isSelect: true,
      },
      {
        id: 1,
        title: '销量',
        isSelect: false,
      },
      {
        id: 2,
        title: '价格',
        isSelect: false,
      },
    ],

    //商品列表数据
    goodsList: [],
  },

  /**
   * 请求参数
   */
  QueryParamas: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },

  pageNumTotal: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)

    this.QueryParamas.cid = options.cid || ''
    this.QueryParamas.query = options.query || ''

    //加载商品列表
    this.getCategoryList()
  },

  /**
   * 解析tab数组
   */
  handleTabItemChange(e) {
    let { index } = e.detail

    //结构要看下数据解构自己的
    let { tabDatas } = this.data

    // console.log(tabDatas);

    tabDatas.forEach((v, i) => {
      i === index ? (v.isSelect = true) : (v.isSelect = false)
    })

    this.setData({
      tabDatas,
    })
  },

  //获取商品列表
  async getCategoryList() {
    const result = await request({
      url: '/goods/search',
      data: this.QueryParamas,
    })

    const total = result.data.message.total

    this.pageNumTotal = Math.ceil(total / this.QueryParamas.pagesize)

    if (this.QueryParamas.pagenum === 1) {
    }

    this.setData({
      //拼接数据
      goodsList: [...this.data.goodsList, ...result.data.message.goods],
    })
  },

  /**
   * 上拉触底
   * 加载更多用
   */
  onReachBottom() {
    console.log(this.QueryParamas.pagenum + '==' + this.pageNumTotal)

    if (this.QueryParamas.pagenum >= this.pageNumTotal) {
      wx.showToast({
        title: '加载完毕',
      })
    } else {
      //加载更多数据
      this.QueryParamas.pagenum++

      //加载商品列表
      this.getCategoryList()
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.QueryParamas.pagenum = 1

    this.setData({
      //清空数据
      goodsList: [],
    })

    //加载商品列表
    this.getCategoryList()

    //停止动画
    wx.stopPullDownRefresh()
  },
})
