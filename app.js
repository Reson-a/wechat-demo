const dataService = require('./utils/dataService.js')
const Promise = require('./utils/bluebird.core.min.js')
//app.js
App({
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
    userInfo: null
  }
})