//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  getToolbar() {

    let me = this;
    return {
      setData(list) {
        me.globalData.toolbar.list = list;
        this.countdown = this.selectComponent('#toolbar');
        this.countdown.resetData();
      }
    }
  },
  globalData: {
    userInfo: null,
    toolbar: {
      current: 0,
      list: [{
        title: "首页",
        icon: "homefill",
        badge: "",
        isBadge: false,
        extendClass: "",
        isAdd: false,
        url: "/pages/index/index"

      }, {
        title: "分类",
        icon: "similar",
        badge: "",
        extendClass: "",
        isBadge: false,
        isAdd: false,
          url: "/pages/test/index"

      }, {
        title: "发布",
        icon: "add",
        badge: "",
        extendClass: "shadow button-hover",
        isBadge: false,
        isAdd: true,
        url: ""

      }, {
        title: "购物车",
        icon: "cart",
        badge: "99",
        extendClass: "",
        isBadge: true,
        isAdd: false,
        url: ""

      }, {
        title: "我的",
        icon: "my",
        badge: "",
        extendClass: "",
        isBadge: true,
        isAdd: false,
        url: ""

      }]
    }
  }
})