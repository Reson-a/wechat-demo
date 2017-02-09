# 小程序demo

仿京东商城小程序，用mock.js模拟了部分后端数据，未实现了全部功能

尝试着从以下方面改进了代码


- 全程使用ES6, 表示不想再用ES5了
- 使用bluebird.js对wx原生接口进行了Promise封装，用来控制异步逻辑，不然就是一大堆回调……
- 尝试着使用观察者模式进行简单的状态管理和页面间通信，可能复杂了些但更加清晰便于维护


```
// 代码示例
app.js

App({
  // 注册事件总线
  event: new Event(),
  // 全局数据，类似于单一状态树store
  globalData: {
    // 用户信息
    userInfo: null
  },
  // 修改全局状态的方法，类似于mutation
  setUserInfo (info) {
    this.globalData.userInfo = info
  }
  
index.js

const app = getApp()
const event = app.event
const globalData = app.globalData

Page({
  data: {
    // 页面的状态
    userInfo: globalData.userInfo
  },
  onLoad () {
    // 页面加载添加事件监听
    this.initEvent()
  },
  onUnload () {
    // 页面卸载移除事件监听
    this.removeEvent()
  },
  initEvent () {
    event.on('setUserInfo', this.setUserInfo, this)
  },
  removeEvent () {
    event.off('setUserInfo',this.setUserInfo, this)
  },
  // 事件回调注册为页面实例的方法方便移除
  setUserInfo (info) {
    // 同步到全局状态，这样其他页面可以拿到更改后的状态
    app.setUserInfo(info)
    // 响应式修改本页面的状态
    this.setData({
      userInfo:info
    })
  },
  //事件触发，这里可以实现跨页面通信
  xxxTapHandler (e) {
    let info = e.target.dataset.info
    event.emit('setUserInfo', info)
  }
})
  

```

应该可以造出更好的轮子，个人水平还有待提高就不献丑了
没有管理的话如果做复杂应用逻辑就会变得非常混乱，不过本身拿小程序做复杂应用就是作死行为，现在上线的基本都是app重度阉割版



整体感觉难度不大，可以感觉出来微信是想让水平一般的开发者也能写出合格的代码，但也因此局限性非常大，简洁和灵活性上被Vue甩了几条街

踩了一部分坑但听说还有不少，先研究到这里，有点玩票性质，毕竟前端功底才是关键 
