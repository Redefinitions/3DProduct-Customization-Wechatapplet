// index.js
const app = getApp();
const {
  setBackPagePath,
  setAuthorize,
  setMenuButtonBoundingClientRect,
} = requirePlugin("kivicube-slam");
Page({
  data: {
    sceneId: '1fe832e54aaa42de8232f1bbb9d68ee2',
    params: "&shadow=0.15&ambient=0.3&directional=2.5&horizontal=0&vertical=0&envMap=default&size=0.5&rotation=0&animation=&animationLoop=false&shareImage=&gyroscope=true",
    sharePagePath: '/pages/index/index',
  },
  onLoad() {
    const isTabbarPage = false;
    setBackPagePath("/pages/index/index", isTabbarPage);
    setMenuButtonBoundingClientRect(wx.getMenuButtonBoundingClientRect());
    wx.navigateTo({ url: `plugin://kivicube-slam/scene?id=${this.data.sceneId}${this.data.params}` });
  },
})