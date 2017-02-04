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
    // 获取首页轮播图片列表
    dataService.getSwiperUrlList().then((res) => {
      this.setData({
        'imgUrls': res.body
      })
    })
    // 获取优惠券列表
    dataService.getCouponList()
      .then((res) => {
        // 发布事件更新全局数据
        this.setData({
          'coupons': res.body
        })
      })
      .then(() => {
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
      })

    this.initEvent()
  },
  // 页面卸载,必须移除事件监听
  onUnload() {
    this.removeEvent()
  },

  // 事件处理
  // 点击优惠券触发
  couponTapHandler(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let coupon = this.data.coupons[index]
    if (id === undefined || index === undefined) return
    if (coupon.isReceived) return
    // 缓存优惠券领取状态
    dataService.setStorage('coupon' + id, '1').then(() => {
      // 发布事件
      event.emit('getCoupon', index)
      // 提示信息
      wx.showToast({
        title: '领取成功',
        icon: 'success',
        mask: true,
      })
    })
  },

  // 初始化事件监听，在onLoad中调用
  initEvent() {
    event.on('getCoupon', this.getCoupon, this)
  },
  // 移除事件监听, 在onUnload中调用
  removeEvent() {
    event.off('getCoupon', this.getCoupon)
  },

  // 自定义事件处理
  // 领取优惠券，单独写一个函数便于移除事件监听
  getCoupon(index) {
    // 同步到全局数据
    app.addCoupon(this.data.coupons[index])
    this.setData({
      [`coupons[${index}].isReceived`]: true
    })
  }
})
