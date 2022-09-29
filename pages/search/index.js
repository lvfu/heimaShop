//0 导入请求js
import { request } from '../../request/index.js'
import { showToast, showModal } from '../../utils/utils.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],

    isHaveFouce: false,
    inputValue: '',
  },

  timeId: -1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 输入框监听
   * @param {*} e
   */
  inputChangeListener(e) {
    let { value } = e.detail

    if (!value.trim()) {
      this.setData({
        goods: [],
        isHaveFouce: false,
        inputValue: '',
      })

      clearTimeout(this.timeId)

      return
    }

    clearTimeout(this.timeId)

    this.timeId = setTimeout(() => {
      this.getGoodsSearchData(value)
    }, 1000)
  },

  async getGoodsSearchData(query) {
    const result = await request({ url: '/goods/qsearch', data: { query } })
    const { message } = result.data

    this.setData({
      goods: message,
      isHaveFouce: true,
    })
  },

  cancelClickListener() {
    this.setData({
      goods: [],
      isHaveFouce: false,
      inputValue: '',
    })
  },
})
