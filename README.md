# 安用儿童安全座椅个性化定制小程序商城

后台管理系统与接口使用[https://www.it120.cc/](https://www.it120.cc/) 完成，微信小程序开发库版本2.17，[后台地址](https://admin.it120.cc/)。
商城部分基于[天使童装](https://github.com/teach-tian/wx_tianshi) 开发
3D及AR内容制作要求部分参照[Kivicube小程序AR素材规范](https://www.yuque.com/kivicube/manual/mp-specs) 

## 功能概述及开发简介

### 小程序商城

主要程序实现和核心功能基于it120工厂提供的模板与接口完成，提供免费并较为齐全的的后台管理内容，商家可在后台对小程序进行管理，并根据需要对功能进行删减。
由于微信底层接口经常变更，为了后期持续上线需要建议选择有维护的框架。
开发与设计内容请参照[小程序开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/)
与[小程序设计指南](https://developers.weixin.qq.com/miniprogram/design/)

### 3D

在机内想要越好的3D效果意味着越高的机器负担，因此商用实现方法多为云端模型渲染+webview组件浏览来减少机器压力。这种实现方式需要微信小程序[域名授权]（https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html）同时需要网络编程和云端服务器支持，成本极高且由于依靠网络数据传输所以有一定的交互延迟。

本案例采用云素材（存入api）+本地渲染的开发方式，对最终用户设备性能有一定的要求。
模型与素材：厂商给的生产用素材过大，700多MB经过多次压缩后仍然有20MB，需要根据网络传播需求重新制作模型；想要更精细且真实的效果，材质部分需要特定光照条件进行拍摄和制作。
引擎部分：3D引擎部分基于[官方3D引擎](https://github.com/wechat-miniprogram/threejs-miniprogram)修改，根据案例需要进行删减；由于微信小程序框架没有H5中的DOM接口，因此添加了Eventbus处理3D交互事件，文件见libs文件夹。

### AR

微信小程序官方给出的AR效果（空间定位内容）开发工具为VKsession，本案例开发版本2.0，相关文档在下方。
由于模型过大最终使用三方云端AR效果实现[小程序SLAM](https://slam.kivicube.com/)，场景代码和插件代码如下，官方[用户文档](https://www.yuque.com/kivicube/manual/get-started)。

06e2b9337f304e56a9676e6ab7a6ce52

wx12ad8a61f049ea02

plugin://kivicube-slam/scene?id=06e2b9337f304e56a9676e6ab7a6ce52

plugin://kivicube-slam/scene?id=06e2b9337f304e56a9676e6ab7a6ce52&shadow=0.15&ambient=0.3&directional=2.5&horizontal=0&vertical=0&envMap=default&size=0.5&rotation=0&animation=&animationLoop=false&shareImage=&gyroscope=false

## 联系作者

| 微信好友 | QQ好友 |
| redefinitions | 2653411753 |

## 本项目使用组件

- [接口 SDK](https://github.com/gooking/apifm-wxapi)

- [api工厂](https://admin.it120.cc)

- [vant-weapp](https://youzan.github.io/vant-weapp)

- [小程序富文本插件（html 渲染）](https://github.com/jin-yufeng/Parser)

- [小程序海报组件-生成朋友圈分享海报并生成图片](https://github.com/jasondu/wxa-plugin-canvas)

- [Apache ECharts](https://github.com/ecomfe/echarts-for-weixin)

- [VKSession](https://developers.weixin.qq.com/miniprogram/en/dev/api/ai/visionkit/VKSession.html)

- [SLAM - AR图像识别，支持Slam](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx12ad8a61f049ea02)

- [Iconfont - 图标](https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=20682)
  
## 小程序商城组件升级

- 小程序程序的修改和您后台的数据是独立的
- 下载最新版的程序，直接覆盖本地的程序
- 用开发工具修改域名 mall 为自己的域名
- 联系开发者添加为代码管理人员
- 在开发工具里面上传代码提交微信审核
- 审核通过后，小程序后台去发布新版本即可
- 用户无需重新扫码，关闭小程序重新打开就是新版本了
