//0 导入请求js
import { request } from '../../request/index.js'

Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: [],
  },

  onLoad: function (options) {
    this.getSwiperList()
    this.getClassList()
    this.getCateList()
  },

  async getSwiperList() {
    //轮播
    const result = await request({ url: '/home/swiperdata' })

    this.setData({
      swiperList: result.data.message,
    })
  },

  async getClassList() {
    //分类
    const result = await request({ url: '/home/catitems' })

    this.setData({
      cateList: result.data.message,
    })
  },

  async getCateList() {
    //列表
    const result = await request({ url: '/home/floordata' })

    const dataList = result.data.message
    dataList.forEach((v, i) => {
      v.product_list.forEach((w, j) => {
        let splitArr = w.navigator_url.replace('?', '/index?')
        w.navigator_url = splitArr
      })
    })

    this.setData({
      floorList: dataList,
    })
  },
})
