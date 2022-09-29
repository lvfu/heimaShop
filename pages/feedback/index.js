Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabDatas: [
      {
        id: 0,
        title: '体验问题',
        isSelect: true,
      },
      {
        id: 1,
        title: '商品 商家投诉',
        isSelect: false,
      },
    ],

    imgs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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

  /**
   * 选择图片
   */
  chooseImagTap() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        let pathImg = []

        const imgs = res.tempFiles

        imgs.forEach((v, i) => {
          pathImg.push(v.tempFilePath)
        })

        this.setData({
          imgs: [...this.data.imgs, ...pathImg],
        })
      },
    })
  },

  /**
   * 删除元素
   * @param {} e
   */
  deleteClickListener(e) {
    const { index } = e.detail

    const { imgs } = this.data

    imgs.splice(index, 1)

    this.setData({
      imgs,
    })
  },
})
