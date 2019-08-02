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
      { pic:'https://app.ycl56.com/upload/banner01.png'},
      { pic:'https://app.ycl56.com/upload/banner2.png'},
      { pic:'https://app.ycl56.com/upload/banner3.png'}
    ],
    orderNum:'',
    ticketNum:'',
    companyPhone:'',
    list:[
      {id:0,title:'同城整车',slogn:'找车就是快！',pic:'../../images/zheng.png',path:'../mapSameVehicle/mapSameVehicle'},
      {id:1,title:'寄件发货',slogn:'顺风车拼货更实惠！',pic:'../../images/pin.png',path:'../express/express'},
      {id:2,title:'出行用车',slogn:'轻松找到私家车！',pic:'../../images/car.png',path:'../mapCityTravel/mapCityTravel'},
      {id:3,title:'客服电话',slogn:'快速解决疑难问题！',pic:'../../images/service.png'},
    ]
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
        console.log(res)
        if (res.resultCode == 1) {
          _this.setData({
            messageNum: res.readState +'条',
            orderNum: res.msgcCount,
            ticketNum: res.settleCount,
            companyPhone: res.companyPhone
          })
          //保存在本地
          wx.setStorageSync('companyPhone',res.companyPhone);     
        }else{
          wx.showToast({
            title: res.result,
            icon: 'none',
            duration: 1000
          })
        }
      });
   },
  //订单记录
  getOrderLogs: function () {
    wx.navigateTo({
      url: '../orderRecord/orderRecord',
    })
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
  },
  //拨打电话
  listBtn: function (e) {
    if (e.currentTarget.dataset.id == 3) {
     var  companyphone= this.data.companyPhone;
      wx.makePhoneCall({
        phoneNumber:companyphone //仅为示例，并非真实的电话号码
      })
    }
  },
 })
