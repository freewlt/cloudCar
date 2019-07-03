// pages/login.js

const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    logo:'../../images/logo.png',
    phonePic:'../../images/phone.png',
    codePic:'../../images/code.png',
    code:'',
    iscode:null,
    codename:'获取',
    disabled:false,
    phone:'13511074949',//手机号
    code:'',//验证码
    allValue:''
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
    var _this = this;
    var phone = _this.data.phone;
    var appid = app.globalData.appid;
    var time = util.formatTime(new Date());
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (_this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(_this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      util.request(api.getphoneMsg,{
        phone: phone,
        phonetype:'14',
        appId: appid,
        timeStamp: time,
        sign: utilMd5.hexMD5(phone+'14'+ appid+time)}
      ).then(function (res) {
        console.log(res)
        if(res.resultCode == 1){
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
          disabled:true,
          iscode: res.token
         })
        }else{
          wx.showToast({
            title: res.result,
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
  formSubmit: function() {
    var _this = this;
    var phonecode = _this.data.code;
    var appid=app.globalData.appid;
    var userName = _this.data.phone;
    var time = util.formatTime(new Date());
    util.request(api.loginPhonecode,{
      phonecode:phonecode,
      userName:userName,
      appId:appid,
    }).then(function (res) {
      console.log(res)
      wx.setStorage({key:"userDetail",data:{
        id: res.id,
        token: res.token,
        companyPhone: res.companyPhone,}})
      if (res.resultCode == 1) {
          wx.switchTab ({
            url: '../home/home',
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
  formReset: function() {
    this.setData({
      allValue:''
    })
  }
 })
