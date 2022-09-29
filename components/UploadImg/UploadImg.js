// components/UploadImg/UploadImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: {
      type: String,
      value: '',
    },
    index: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    deleteClickTap(e) {
      const index = e.currentTarget.dataset.index

      console.log('点删除了' + index)

      //类似于回调到父组件
      this.triggerEvent('deleteClickTap', { index: index })
    },
  },
})
