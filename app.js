const dataService = require('./utils/dataService.js')
const Promise = require('./utils/bluebird.core.min.js')
const Event = require('./utils/event.js')
//app.js
App({
  //
  event: new Event(),
  onLaunch: function () {
    /* 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
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
  // 全局数据，类似于单一状态树store
  globalData: {
    // 用户信息
    userInfo: null,
    // 全部订单
    orders: [],
    // 待付款
    notPaid: [],
    // 待收货
    notReceived: [],
    // 售后订单
    afterSale: [],
    // 优惠券信息
    coupons: [],
  },

  // mutations: 
  // 添加优惠券
  addCoupon(coupon) {
    if (this.globalData.coupons.indexOf(coupon) < 0) {
      this.globalData.coupons.push(coupon)
    }
  }
})