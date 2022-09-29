// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      tabs:{
        type:Array,
        value:[]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    tabClickTap(e){

     const index =  e.currentTarget.dataset.index
     const id =  e.currentTarget.dataset.id


     //类似于回调到父组件
     this.triggerEvent("tabItemChange",{index:index,id:id})
    }
  }
})
