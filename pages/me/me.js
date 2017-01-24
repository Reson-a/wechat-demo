// pages/order/order.js
const app = getApp()
const event = app.event
const globalData = app.globalData

Page({
  data: {
    userInfo: null,
    itemList: [{
      title: '全部订单',
      name: 'orders',
      count: 0,
      url: '',
      icon: '/images/order.png'
    },
    {
      title: '待付款',
      name: 'notPaid',
      count: 0,
      url: '',
      icon: '/images/not-paid.png'
    }, {
      title: '待收货',
      name: 'notReceived',
      count: 0,
      url: '',
      icon: '/images/not-received.png'
    },
    {
      title: '售后订单',
      name: 'afterSale',
      count: 0,
      url: '',
      icon: '/images/after-sale.png'
    },
    {
      title: '优惠券',
      name: 'coupons',
      count: 0,
      url: '',
      icon: '/images/coupon.png'
    }]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo().then((res) => {
      this.setData({
        userInfo: res
      })
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.updateCount()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // 更新显示数量
  updateCount() {
    for (let i = 0, l = this.data.itemList.length; i < l; i++) {
      let name = this.data.itemList[i].name
      this.setData({
        [`itemList[${i}].count`]: globalData[name].length
      })
    }
  }
})