// pages/order/order.js
const app = getApp()
const event = app.event
const globalData = app.globalData

Page({
    data: {
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
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

    },
    // 移除事件监听, 在onUnload中调用
    removeEvent() {

    },

    // 取消搜索，返回首页
    cancelBtnTapHandler() {
        wx.navigateBack()
    }
})