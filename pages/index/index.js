const dataService = require('../../utils/dataService.js')
//index.js
//获取应用实例
const app = getApp()
const event = app.event

Page({
  data: {
    imgUrls: [],
    coupons: app.globalData.coupons // 初始状态
  },
  // 页面加载
  onLoad: function () {
    event.on('updateCoupons', this.updateCoupons, this)
    // 获取首页轮播图片列表
    dataService.getSwiperUrlList().then((res) => {
      this.setData({
        'imgUrls': res.body
      })
    })
    // 获取优惠券列表
    dataService.getCouponList().then((res) => {
      // 发布事件更新全局数据
      event.emit('updateCoupons', res.body)
    })
    // 更新优惠券显示状态
    for (let i = 0, l = this.data.coupons.length; i < l; i++) {
      let id = this.data.coupons[i].id
      // 读取优惠券领取状态缓存
      dataService.getStorage('coupon' + id).then((res) => {
        if (res.data) {
          this.setData({
            [`coupons[${i}].isReceived`]: true
          })
          this.updateCoupons()
        }
      })
    }
  },
  // 页面卸载,必须移除事件监听
  onUnload() {
    event.remove('updateCoupons', this.updateCoupons)
  },
  // 更新优惠券信息，单独写一个函数便于移除事件监听
  updateCoupons(data) {
    if (data) {
      this.setData({
        'coupons': data
      })
    }
    // 同步到全局数据
    app.globalData.coupons = this.data.coupons
  },
  // 点击优惠券触发
  couponTapHandler(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    if (id === undefined || index === undefined) return
    if (this.data.coupons[index].isReceived) return
    // 缓存优惠券领取状态，考虑到安全性更应该后端返回，这里只是为了练习相关api
    dataService.setStorage('coupon' + id, '1').then(() => {
      this.setData({
        [`coupons[${index}].isReceived`]: true
      })
      // 提示信息
      wx.showToast({
        title: '领取成功',
        icon: 'success',
        mask: true,
      })
    })
  }
})
