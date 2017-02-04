// pages/order/order.js
const app = getApp()
const event = app.event
const globalData = app.globalData

Page({
  data: {
    userInfo: null,
    itemList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 获取用户信息
    app.getUserInfo().then((res) => {
      this.setData({
        userInfo: res
      })
    })
    // 获取渲染列表项项，从globalData中初始化数目
    this.setData({
      itemList: [{
        title: '全部订单',
        name: 'orders',
        count: globalData.orders.length,
        url: '',
        icon: '/images/order.png'
      },
      {
        title: '待付款',
        name: 'notPaid',
        count: globalData.notPaid.length,
        url: '',
        icon: '/images/not-paid.png'
      }, {
        title: '待收货',
        name: 'notReceived',
        count: globalData.notReceived.length,
        url: '',
        icon: '/images/not-received.png'
      },
      {
        title: '售后订单',
        name: 'afterSale',
        count: globalData.afterSale.length,
        url: '',
        icon: '/images/after-sale.png'
      },
      {
        title: '优惠券',
        name: 'coupons',
        count: globalData.coupons.length,
        url: '',
        icon: '/images/coupon.png'
      }]
    })

    this.initEvent()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    this.removeEvent()
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
  // 领取优惠券触发，单独写一个函数便于移除事件监听
  getCoupon() {
    this.setData({
      [`itemList[4].count`]: globalData.coupons.length
    })
  }
})