// pages/detailList/detailList.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'同城速运',
    messageNum:'添加',
    backPic:'../../images/back.png',
    backTxt:'返回',
    deliveryInfo:[
      {title:'内墙腻子粉',name:'张三',phone:'16',address:"北京市恒大御景湾"},
      {title:'内墙腻子粉',name:'李四',phone:'1586',address:"北京市恒大御景湾"},
    ]
   },
  //  增加清单
  detailListAdd:function(){
    wx.navigateTo({
      url:'../detailListAdd/detailListAdd'
    })
  },
  
  detailList:function(){
    wx.navigateTo({
      url: '../detailListAdd/detailListAdd',
    })
  },
  
 })


