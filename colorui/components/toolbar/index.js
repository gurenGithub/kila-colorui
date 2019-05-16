const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    current: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal) {
        // 属性值变化时执行

        console.log(newVal, oldVal);
      }

    },
    list: {
      type: Array,
      value: []
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  pageLifetimes: {
    show() {
      // 页面被展示

      this.setData({
        list: app.globalData.toolbar.list
      });
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

    onItem(e) {
      let index = e.currentTarget.dataset.index;
      let url = e.currentTarget.dataset.url;
      this.setData({
        current: index
      },function(){

        wx.reLaunch({
          url: url
        })
      });
    },
    resetData(data) {

      console.log('resetData', data);
    }
  }
})