// pages/login.js

const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    logo:'../../images/logo.png',
    phonePic:'../../images/phone.png',
    codePic:'../../images/code.png'
   },
  onLoad: function (options){
      var that = this;
      // that.setData({
      //     title: options.name
      // })
   },

  // 获取验证码
  getCode:function(){
    util.request(api.IndexUrlNewGoods).then(function (res) {
      if (res.errno === 0) {}
       
    });
  },
  //登录
  loginBtn:function(){
    util.request(api.IndexUrlNewGoods).then(function (res) {
      if (res.errno === 0) {}
    });
    wx.navigateTo({
      url: '../home/home',
    })
  }
 })
