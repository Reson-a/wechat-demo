const dataService = require('../../utils/dataService.js')
//index.js
//获取应用实例
const app = getApp()
const event = app.event
const globalData = app.globalData

Page({
  data: {
    imgUrls: [],
    coupons: [] // 初始状态
  },
  // 页面加载
  onLoad: function () {
    event.on('getCoupon', this.getCoupon, this)
    // 获取首页轮播图片列表
    dataService.getSwiperUrlList().then((res) => {
      this.setData({
        'imgUrls': res.body
      })
    })
    // 获取优惠券列表
    dataService.getCouponList().then((res) => {
      // 发布事件更新全局数据
      this.setData({
        'coupons': res.body
      })
    })
    // 更新优惠券显示状态
    for (let i = 0, l = this.data.coupons.length; i < l; i++) {
      let id = this.data.coupons[i].id
      // 读取优惠券领取状态缓存
      dataService.getStorage('coupon' + id).then((res) => {
        if (res.data) {
          event.emit('getCoupon', i)
        }
      })
    }
  },
  // 页面卸载,必须移除事件监听
  onUnload() {
    event.remove('getCoupon', this.getCoupon)
  },
  // 领取优惠券，单独写一个函数便于移除事件监听
  getCoupon(index) {
    this.setData({
      [`coupons[${index}].isReceived`]: true
    })
    // 领取的优惠券同步到全局数据
    let coupon = this.data.coupons[index]
    if (globalData.coupons.indexOf(coupon) < 0) {
      globalData.coupons.push(coupon)
    }
  },
  // 点击优惠券触发
  couponTapHandler(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    if (id === undefined || index === undefined) return
    if (this.data.coupons[index].isReceived) return
    // 缓存优惠券领取状态
    dataService.setStorage('coupon' + id, '1').then(() => {
      event.emit('getCoupon', index)
      // 提示信息
      wx.showToast({
        title: '领取成功',
        icon: 'success',
        mask: true,
      })
    })
  }
})
