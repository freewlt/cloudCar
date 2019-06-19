// pages/home/home.js

const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    backPic:'../../images/QRcode.png',
    title:'首页',
    messageNum:'30'+'条',
    banner:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png',
    orderNum:'300',
    ticketNum:'10',
    list:[
      {title:'同城整车',slogn:'找车就是快！',pic:'../../images/zheng.png',path:'../sameVehicle/sameVehicle'},
      {title:'寄件发货',slogn:'顺风车拼货更实惠！',pic:'../../images/pin.png'},
      {title:'出行用车',slogn:'轻松找到私家车！',pic:'../../images/car.png'},
      {title:'客服电话',slogn:'快速解决疑难问题！',pic:'../../images/service.png'},
    ]
   },
  onLoad: function (options){
      var that = this;
   },

 
  //登录
  codeBtn:function(){
    wx.navigateTo({
      url: '../generalize/generalize',
    })
  },
  // 系统消息
  sysBtn:function(){
    wx.navigateTo({
      url: '../sysMes/sysMes',
    })
  }
 })
