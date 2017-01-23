const dataService = require('./utils/dataService.js')
const Promise = require('./utils/bluebird.core.min.js')
const Event = require('./utils/event.js')
//app.js
App({
  //
  event: new Event(),
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo() {
    if (this.globalData.userInfo) {
      return new Promise((resolve, reject) => {
        resolve(this.globalData.userInfo)
      })
    } else {
      //调用登录接口
      return new Promise((resolve, reject) => {
        dataService.login()
          .then(dataService.getUserInfo)
          .then((res) => {
            this.globalData.userInfo = res.userInfo
            resolve(this.globalData.userInfo)
          })
      })
    }
  },
  globalData: {
    // 用户信息
    userInfo: null,
    // 优惠券信息
    coupons: []
  }
})