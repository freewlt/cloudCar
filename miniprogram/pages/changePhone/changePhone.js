// pages/changePhone/changePhone.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'更换手机号',
    phone:"1",
    code:'',
    iscode:null,
    codename:'获取'
   },
  onLoad: function (){
   },
   formSubmit:function(){
   },
   
   getCode:function(){
    var a = this.data.phone;
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
      wx.request({
        data: {},
        'url': 接口地址,
        success(res) {
          console.log(res.data.data)
          _this.setData({
            iscode: res.data.data
          })
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
        }
      }) 
    }
    
    
  },
   // 获取验证码
   getVerificationCode:function(){
    //this.getCode();
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
      var _this = this
      _this.setData({
        disabled: true
      })
   },

 })