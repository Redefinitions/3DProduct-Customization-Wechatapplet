const WXAPI = require('apifm-wxapi')
WXAPI.init('Anyong')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')

const APP = getApp()

Page({
  data: {
    imgUrls: [
      {url:'https://dcdn.it120.cc/2022/03/13/f632f5af-7aaf-462e-b73a-9bcd4718956b.png'},
      {url:'https://dcdn.it120.cc/2022/03/13/cec944a9-c854-4202-8510-6321101a9c99.png'},
      {url:'https://dcdn.it120.cc/2022/03/13/6300618c-bba7-4c0c-b0ef-4d08852c050a.png'}
    ]
  },
  onLoad: function (options) {
    // 读取最新的一条公告
    WXAPI.noticeLastOne().then(res => {
      console.log('最新的一条公告：', res)
    })
    // 读取公告列表
    WXAPI.noticeList().then(res => {
      console.log('公告列表数据：', res)
    })
  const that = this
  that.getNotice()
  },
  
  getNotice: function() {
    var that = this;
    WXAPI.noticeList({pageSize: 5}).then(function (res) {
      if (res.code == 0) {
        that.setData({
          noticeList: res.data
        });
      }
    })
  },
  goNotice(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/notice/show?id=' + id,
    })
  },
  goCustom: function(event) {
    wx.navigateTo({
      url: '/pages/ARcustom/index',
    })  
  }
})
