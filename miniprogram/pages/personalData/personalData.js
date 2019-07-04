// pages/personalData/personalData.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'资料',
    username:'',
    password:'',
    linkphone:'',
    linkMan:'',
    
   },
  onLoad: function (){
    var _this = this;
    wx.getStorage({
      key: 'companyName',
      success (res) {
        _this.setData({
          linkMan:res.data
        })
      }
    })
    var userDetail = wx.getStorageSync('userDetail')
    _this.setData({
      linkphone:userDetail.companyPhone,
      username:app.globalData.nickName
    })
   },
  //返回按钮
  onMyEvent: function(e){
    let pages = getCurrentPages();
   // 获取上一级页面，即pageA的page对象
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
   //昵称
   nickName:function(){
     wx.navigateTo({
      url:'../nickName/nickName'
    })
   }

 })