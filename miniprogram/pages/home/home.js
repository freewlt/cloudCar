// pages/home/home.js

const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    backPic:'../../images/QRcode.png',
    title:'首页',
    messageNum:'',
    bannerList:[
      {pic:'http://www.xinhuanet.com/photo/2018-10/07/1123525197_15389079303861n.jpg'},
      {pic:'http://desk-fd.zol-img.com.cn/g5/M00/06/0F/ChMkJ1Xv0ESINawwAAiuhK14OwIAACbiwCRYqoACK6c023.jpg'},
      {pic:'http://img.mp.itc.cn/upload/20160525/0b081eece75c45c2b2b14ac97ef96e86_th.JPG'}
    ],
    orderNum:'',
    ticketNum:'',
    list:[
      {id:0,title:'同城整车',slogn:'找车就是快！',pic:'../../images/zheng.png',path:'../mapSameVehicle/mapSameVehicle'},
      {id:10,title:'寄件发货',slogn:'顺风车拼货更实惠！',pic:'../../images/pin.png',path:'../express/express'},
      {id:2,title:'出行用车',slogn:'轻松找到私家车！',pic:'../../images/car.png',path:'../mapCityTravel/mapCityTravel'},
      {id:3,title:'客服电话',slogn:'快速解决疑难问题！',pic:'../../images/service.png',path:'../home/home'},
    ],
   },
  onLoad: function (){
      var _this = this;
      var userDetail = wx.getStorageSync('userDetail')
      var appid=app.globalData.appid;
      var userId=userDetail.id;
      var token=userDetail.token;
      util.request(api.getHomeInfo,{
        userId:userId,
        appId:appid,
        token:token,
      }).then(function (res) {
        if (res.resultCode == 1) {
          _this.setData({
            messageNum: res.readState +'条',
            orderNum: res.msgcCount,
            ticketNum: res.settleCount,
          })
        }else{
          wx.showToast({
            title: res.result,
            icon: 'none',
            duration: 1000
          })
        }
      });
   },

   //拨打电话
   listBtn:function(e){
    if(e.currentTarget.dataset.id == 3){
      wx.makePhoneCall({
        phoneNumber: '1340000' //仅为示例，并非真实的电话号码
      })
    }
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
