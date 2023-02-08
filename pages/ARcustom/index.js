import { renderGL } from './useThree'
import { changeColor } from './useThree'
import EventBus from '../../libs/adpter/EventBus'
import touchEventHandlerFactory from '../../libs/adpter/touchEventHandlerFactory'
const WXAPI = require('apifm-wxapi')
let part,color

Page({
  data: {
    canvasWidth: 0,
    canvasHeight: 0,
    menuButtonTop: 32,
    menuButtonHeight: 32,
    show: false,
    helpicon:"https://dcdn.it120.cc/2022/03/14/e7c17399-cf18-4317-a2c1-dd50ccb83912.png",
    aricon:"https://dcdn.it120.cc/2022/03/14/f69535ce-7241-4e57-a7bf-ef3eb2061c61.png",
    head:"https://dcdn.it120.cc/2022/03/21/68a3afcc-6fd4-418c-a809-1211f12a08ca.png",
    insider:"https://dcdn.it120.cc/2022/03/21/7f54903d-860f-4ae8-ba52-7d7452a612e0.png",
    lock:"https://dcdn.it120.cc/2022/03/21/43e826a6-b570-4ac8-86bc-b39f995d2c47.png",
    strip:"https://dcdn.it120.cc/2022/03/21/d2baed23-c482-4bea-ba09-d831951314b0.png",
    base:"https://dcdn.it120.cc/2022/03/21/75c13779-b714-4f43-a10c-11ea61ccdb10.png",
    backbone:"https://dcdn.it120.cc/2022/03/21/75d7f453-52f7-4d61-a882-2030026cd120.png",
    helppic:"https://dcdn.it120.cc/2022/03/21/7a5d16f9-9660-4a00-aff0-92860c45fc6c.png",
    model: 'zuoyi',
    color: '#000000',
    part: 'head',
    colorname:'欢迎使用安用定制',
    active: 0,
    colorlist: [
        { cname: "幻想紫", id: 1, color: "#8A2BE2" },
        { cname: "活力橙", id: 2, color: "#A52A2A" },
        { cname: "亲肤黄", id: 3, color: "#DEB887" },
        { cname: "素雅绿", id: 4, color: "#5F9EA0" },
        { cname: "跃动蓝", id: 5, color: "#00FFFF" },
        { cname: "高贵金", id: 6, color: "#BDB76B" },
        { cname: "中国红", id: 7, color: "#8B0000" },
    ],
    itemlist: [
        { identification: "头枕" },
        { identification: "坐垫" },
        { identification: "内衬" },
        { identification: "肩带" },
        { identification: "底座" },
        { identification: "后背" },
    ]
  },
  
  changeModel:function(event) {
    this.active = event.currentTarget.dataset.id;
    this.model = event.currentTarget.dataset.part;
    part = this.model;
    this.setData({colorname:part})
  },
  updateColor:function(event) {
    this.color = event.currentTarget.dataset.color;
    this.name = event.currentTarget.dataset.name;
    color = this.color;
    var name = this.name;
    this.setData({colorname:name})
    changeColor(part,color)
  },
  showAR(){
    wx.navigateTo({
      url: '/VKsession/VKsession'
    })
  },
  onReady() {
    //初始化Canvas对象
    this.initWebGLCanvas();
    // 设置场景
  },
  /**
   * 初始化Canvas对象
   */
  initWebGLCanvas() {
    //获取页面上的标签id为webgl的对象，从而获取到canvas对象
    const query = wx.createSelectorQuery();
    query.select('#webgl').node()
      .exec((res) => {
        const canvas = res[0].node;
        const { windowWidth, windowHeight } = wx.getSystemInfoSync();
        // 设置视图窗口大小 默认是300 * 150
        this.setData({
          canvasWidth: windowWidth/1.7,
          canvasHeight: windowHeight/1.7,
        });
        renderGL(canvas)
      });
  },

  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  onClickShow() {
    this.setData({ show: true });
  },
  onClickHide() {
    this.setData({ show: false });
  },
  noop() {},
  onTouchStart(e) {
    const event = touchEventHandlerFactory(e)
    EventBus.dispatchEvent(event)
  },
  onTouchMove(e) {
    const event = touchEventHandlerFactory(e)
    EventBus.dispatchEvent(event)
  },
  onTouchEnd(e) {
    const event = touchEventHandlerFactory(e)
    EventBus.dispatchEvent(event)
  },
  onTouchTap(e) {
    const event = touchEventHandlerFactory(e)
    EventBus.dispatchEvent(event)
  },
  addtocart() {
    WXAPI.shippingCarInfoAddItem(wx.getStorageSync('token'), 1081078, 1)
    wx.showToast({
      title: '加入购物车',
      icon: 'success'
    })
  }
});
