// pages/order/order.js
const app = getApp()
Page({
  data: {
    userInfo: null,
    itemList: [{
      title: '全部订单',
      count: 0,
      url: '',
      icon: ''
    },
    {
      title: '待付款',
      count: 0,
      url: '',
      icon: ''
    }, {
      title: '待收货',
      count: 0,
      url: '',
      icon: ''
    },
    {
      title: '售后订单',
      count: 0,
      url: '',
      icon: ''
    },
    {
      title: '优惠券',
      count: 0,
      url: '',
      icon: ''
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
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})