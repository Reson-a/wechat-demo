const dataService = require('../../utils/dataService.js')
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [],
    coupons: [],
    modalContent: ''
  },
  onLoad: function () {
    // 获取首页轮播图片列表
    dataService.getSwiperUrlList().then((res) => {
      this.setData({
        'imgUrls': res.body
      })
    })
    // 获取优惠券列表
    dataService.getCouponList().then((res) => {
      this.setData({
        'coupons': res.body
      })
    })
    // 更新优惠券显示状态
    for (let i = 0, l = this.data.coupons.length; i < l; i++) {
      let id = this.data.coupons[i].id
      dataService.getStorage('coupon' + id).then((res) => {
        if (res.data) {
          this.setData({
            [`coupons[${i}].isReceived`]: true
          })
        }
      })
    }
  },
  // 
  couponTapHandler(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    if (id === undefined || index === undefined) return
    if (this.data.coupons[index].isReceived) return

    dataService.setStorage('coupon' + id, '1').then(() => {
      this.setData({
        [`coupons[${index}].isReceived`]: true
      })
      this.setData({
        modalContent: '领取成功'
      })
    })
  },
  // 
  modalTapHandler() {
    this.setData({
      modalContent: ''
    })
  }
})
