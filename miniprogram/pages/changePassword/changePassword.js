// pages/changePassword/changePassword.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title:'修改密码',
    nickTitle:'名称',
    nickName:"请输入",
    password:'',
    passwordNew:'',
    passwordNewAgain:'' 
   },
  onLoad: function (){
   },
  //获取input输入框的值
  getPwsValue: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  getPwsNewValue: function (e) {
    this.setData({
      passwordNew: e.detail.value
    })
  },
  getPwsAgainValue: function (e) {
    this.setData({
      passwordNewAgain: e.detail.value
    })
  },
   //返回按钮
  onMyEvent: function(e){
    let pages = getCurrentPages();
   //获取上一级页面，即pageA的page对象
   let prevPage = pages[pages.length - 2];
   let prevPageData = prevPage.data;
   prevPage.onLoad();
   prevPage.setData({
     isRefresh: true
   });
   wx.navigateBack({
     delta: 1
   })
  },

   formSubmit:function(){
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var appid ='wx0b5fd5d4d5f1dd68';
    var companyName=_this.data.nickName;
    var pwsOld = _this.data.password;
    var pws = _this.data.passwordNew;
    var pwsAagin = _this.data.passwordNewAgain;
    var userId=userDetail.id;
    var token=userDetail.token;
    this.setData({
      time: TIME,
    });
    if(pwsOld == ""){
      wx.showToast({
        title: '旧密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if(pws == ""){
      wx.showToast({
        title: '新密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if(pws == pwsOld){
      wx.showToast({
        title: '新旧密码不能一致',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if(pws !== pwsAagin){
      wx.showToast({
        title: '输入密码不一致',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      wx.switchTab ({
        url: '../personal/personal'
      })
    }
    util.request(api.UpdateCompanyInfo,{
      userId:userId,
      appId:appid,
      token:token,
      pws:pws,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
    }).then(function (res) {
      if (res.resultCode == 1) {
        app.globalData.nickName = companyName;
        wx.setStorage({
          key:"password",
          data:pws
        })
        // 隐藏加载框
        wx.hideLoading();
      }else{
        wx.showToast({
          title: res.result,
          icon: 'none',
          duration: 1000
        })
      }
    });
   }
 })
