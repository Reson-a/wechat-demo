// pages/order/order.js
const dataService = require('../../utils/dataService.js')
const app = getApp()
const event = app.event
const globalData = app.globalData

Page({
    data: {
        searchIptValue: '',
        selectedIndex: 0,
        goods: [],
        sort: '',
        price: 0,// 默认为降序,1为升序
        filter: ''
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            searchIptValue: options.search
        })
        // 获取商品列表
        this.search(options)

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

    // 输入同步到到view中
    searchIptHandler(event) {
        this.setData({
            searchIptValue: event.detail.value
        })
    },
    // 取消搜索，返回首页
    cancelBtnTapHandler() {
        wx.navigateBack()
    },
    // 搜索
    searchBtnTapHandler() {
        event.emit('search')
    },
    sortByComposite() {
        this.setData({
            sort: 'composite',
            selectedIndex: 0
        })
        this.search();
    },
    sortBySale() {
        this.setData({
            sort: 'sale',
            selectedIndex: 1
        })
        this.search();
    },
    sortByPrice() {
        this.setData({
            price: 1 - this.data.price,
            selectedIndex: 2
        })
        this.search();
    },
    sortByFilter() {
        this.setData({
            filter: '',
            selectedIndex: 3
        })
        // 待实现 
    },
    // 搜索商品
    search() {
        // 显示加载
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })

        let params = {}
        let $data = this.data
        params.search = $data.searchIptValue
        params.sort = $data.sort
        params.price = $data.price
        params.filter = $data.filter

        // 获取商品
        dataService.getGoodsList(params).then((res) => {
            if (res.body) {
                this.setData({
                    goods: res.body
                })
                wx.hideToast()
            }
            else {
                wx.showModal({
                    title: '提示',
                    content: '无搜索结果',
                    showCancel: false,
                    success: (res) => { }
                })
            }
        })

    },
    customData: {

    }
})