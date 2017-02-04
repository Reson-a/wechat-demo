// pages/order/order.js
const dataService = require('../../utils/dataService.js')
const app = getApp()
const event = app.event
const globalData = app.globalData

Page({
    data: {
        searchIptValue: '',
        searchHistory: [],
        hotTags: []
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        // 获取热门搜索标签列表
        dataService.getHotTagList().then((res) => {
            console.log(res)
            this.setData({
                hotTags: res.body
            })
        })
        // 获取搜索地址列表
        dataService.getStorage('search-history').then((res) => {
            this.setData({
                searchHistory: JSON.parse(res.data)
            })
        }).catch((err) => { console.log(err) })

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
        event.on('search', this.search, this)
    },
    // 移除事件监听, 在onUnload中调用
    removeEvent() {
        event.off('search', this.search, this)
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
    // 清除搜索历史
    historyClearTapHandler() {
        dataService.setStorage('search-history', '')
        this.setData({
            searchHistory: []
        })
    },
    // 换一批热门搜索
    hotReplaceTapHandler() {
        dataService.getHotTagList().then((res) => {
            this.setData({
                hotTags: res.body
            })
        })
    },
    search() {
        let value = this.data.searchIptValue
        let history = this.data.searchHistory
        wx.navigateTo({
            url: `/pages/search-result/search-result?search=${value}`
        })
        if (history.indexOf(value) < 0) {
            history.push(value)
            this.setData({
                searchHistory: history
            })
            dataService.setStorage('search-history', JSON.stringify(history))
        }
    }
})