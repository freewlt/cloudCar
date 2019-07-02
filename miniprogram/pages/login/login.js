// pages/login.js

const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    logo:'../../images/logo.png',
    phonePic:'../../images/phone.png',
    codePic:'../../images/code.png',
    code:'',
    iscode:null,
    codename:'获取',
    disabled:false,
    phone:'',//手机号
    code:'',//验证码
   },
  onLoad: function (){
  
  },

  //获取input输入框的值
  getPhoneValue:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode:function(){
    var time = util.formatTime(new Date());
    var appid = app.globalData.appid
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      util.request(api.getphoneMsg,{
        phone:this.data.phone,
        phonetype:'14',
        appid:app.globalData.appid,
        timeStamp:time,
        sign:'MD5'}
      ).then(function (res) {
        console.log(res)
        if(res.count === 1){
          var num = 61;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                codename: '重新发送',
                disabled: false
              })
  
            } else {
              _this.setData({
                codename: num + "s"
              })
            }
          }, 1000)
         _this.setData({
          disabled:true
        //   iscode: res.data.data
         })
        }else if(res.count ===0){
          wx.showToast({
            title: '请求失败',
            icon: 'none',
            duration: 1000
          })
        }
        });
        
    }
    
    
  },
   // 获取验证码
   getVerificationCode:function(){
      this.getCode();
   },

  //登录
  formSubmit: function(e) {
    util.request(api.loginPhonecode,{phone:this.data.phone,phontype:'14',appid:app.globalData.appid,timeStamp:''}).then(function (res) {
    var appid = app.globalData.appid
      if (res.errno === 0) {
        console.log(0)
        var brand = res.data.brandList;
        that.setData({
          brand: brand,
        });
      }else{
        console.log(3)
      }
    });
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if(this.data.phone == ""){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(!myreg.test(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if(this.data.code == ""){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(this.data.code != this.data.iscode){
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      wx.setStorageSync('phone', this.data.phone);
      wx.switchTab ({
        url: '../home/home',
      })
    }
    // wx.switchTab ({
    //   url: '../home/home',
    // })
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
 })
