// pages/nickName/nickName.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title:'资料',
    nickTitle:'名称',
    nickName:"请输入"
   },
  onLoad: function (options){
    if(options.index==1){
      this.setData({
        nickTitle:'名称',
      });
    }
    if(options.index==2){
      this.setData({
        nickTitle:'联系人',
      })
    }
   },
  //返回按钮
  onMyEvent: function(e){
    let pages = getCurrentPages();
   // 获取上一级页面，即pageA的page对象
   let prevPage = pages[pages.length - 2];
   let prevPageData = prevPage.data;
   prevPage.onLoad();
   wx.navigateBack({
     delta: 1,
   })
  },

  getValue:function(e){
      var _this = this;
      this.setData({
        nickName: e.detail.value,
      });
  },
  //提交
  submitBtn:function(){
    // this.getValue();
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var appid ='wx0b5fd5d4d5f1dd68';
    var companyName=_this.data.nickName;
    var userId=userDetail.id;
    var token=userDetail.token;
    this.setData({
      time: TIME,
    });
    util.request(api.UpdateCompanyInfo,{
      userId:userId,
      appId:appid,
      token:token,
      companyName:companyName,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
    }).then(function (res) {
      if (res.resultCode == 1) {
        app.globalData.nickName = companyName
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