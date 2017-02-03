// dataService.js
// RESTFULAPI相关全部放在此处

const Mock = require('./mock-min.js')
const Promise = require('./bluebird.core.min.js')

const API_HOST = 'http://localhost/'
const DEBUG = true

// 获取首页轮播图片列表(直接返回mock数据)
function getSwiperUrlList() {
    if (DEBUG) {
        let res = Mock.mock({
            "body|1-1": ['https://img14.360buyimg.com/cms/s800x340_jfs/t3982/171/1113939414/177592/b900245f/586b15e8Ncd76b78a.png!q90.webp', 'https://img13.360buyimg.com/cms/s800x340_jfs/t3100/238/5530740320/89487/2f3b6ab6/5872e99eNbe8272d0.jpg!q90.webp', 'https://img12.360buyimg.com/cms/s800x340_jfs/t3112/341/4932050551/97951/97b5de3e/585ba169N14f67476.jpg!q90.webp', 'https://img14.360buyimg.com/cms/s800x340_jfs/t4024/14/1215614903/97837/c7fff1a2/586c9836Nd81bc652.jpg!q90.webp']
        })
        return new Promise((resolve, reject) => {
            resolve(res)
        })
    }
}
// 获取首页优惠券列表(直接返回mock数据)
function getCouponList() {
    if (DEBUG) {
        let Random = Mock.Random
        let res = Mock.mock({
            "body|1-1": [
                {
                    "id": Random.increment(),
                    "limit|1": [200, 300, 400],
                    "off|1": [10, 20, 50],
                    "merchant": '江南皮革厂',
                    date: Random.date()
                },
                {
                    "id": Random.increment(),
                    "limit|1": [200, 300, 400],
                    "off|1": [10, 20, 50],
                    "merchant": '阿迪王专卖店',
                    date: Random.date()
                },
                {
                    "id": Random.increment(),
                    "limit|1": [200, 300, 400],
                    "off|1": [10, 20, 50],
                    "merchant|1": '味央黑猪礼盒',
                    date: Random.date()
                }, {
                    "id": Random.increment(),
                    "limit|1": [200, 300, 400],
                    "off|1": [10, 20, 50],
                    "merchant|1": '买个锤子旗舰店',
                    date: Random.date()
                }
            ]
        })
        return new Promise((resolve, reject) => {
            resolve(res)
        })
    }
}

//获取热门搜索标签
function getHotTagList() {
    if (DEBUG) {
        let Random = Mock.Random
        let data = [
            ['华为', '魅族', '小米', 'vivo', 'oppo'
                , '三星', '诺基亚'],
            ['联想', '戴尔', '苹果', '雷神', '苹果'
                , '宏碁', '外星人'],
            ['娃哈哈', '乐百氏', '汇源', '康帅博', '怡宝'
                , '王老吉', '农夫山泉']
        ]
        let res = { body: data[Random.increment() - 1] }
        return new Promise((resolve, reject) => {
            resolve(res)
        })
    }
}

// 微信相关api
// 登录
function login() {
    return new Promise((resolve, reject) => {
        wx.login({ success: resolve, fail: reject })
    })
}

// 获取用户信息
function getUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({ success: resolve, fail: reject })
    })
}

// 设置缓存数据
function setStorage(key, value) {
    return new Promise((resolve, reject) => {
        wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
    })
}

// 取得存储数据
function getStorage(key) {
    return new Promise((resolve, reject) => {
        wx.getStorage({ key: key, success: resolve, fail: reject })
    })
}

// 获取位置信息
function getLocation(type) {
    return new Promise((resolve, reject) => {
        wx.getLocation({ type: type, success: resolve, fail: reject })
    })
}

module.exports = {
    getSwiperUrlList,
    getCouponList,
    getHotTagList,
    //微信相关
    login,
    getUserInfo,
    setStorage,
    getStorage,
    getLocation,
    original: wx
}