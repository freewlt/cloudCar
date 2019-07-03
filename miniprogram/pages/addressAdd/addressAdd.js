// pages/detailPerson/detailPerson.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title:'地址列表',
    linkMan:'',
    linkPhone:'',
    descAddress:'',
    lat:'',
    lon:'',
   },
  onLoad: function (){
   },

   //获取input输入框的值
  getManValue:function(e){
    this.setData({
      linkMan:e.detail.value
    })
  },
  getPhoneValue: function (e) {
    this.setData({
      linkPhone: e.detail.value
    })
  },
  getAddressValue: function (e) {
    this.setData({
      descAddress: e.detail.value
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
  //定位
   location:function(){
    wx.navigateTo({
      url:'../map/map'
    })
   },
  //保存
   formSubmit:function(){
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    var linkMan = _this.data.linkMan;
    var linkPhone = _this.data.linkPhone;
    var descAddress = _this.data.descAddress;
    var lat = _this.data.lat;
    var lon = _this.data.lon;
    console.log(descAddress)
    util.request(api.addPiecesAddress,{
      userId:userId,
      appId:appid,
      token:token,
      timeStamp:TIME,
      //sign:utilMd5.hexMD5(token + appid + TIME),
      linkMan:linkMan,
      linkPhone:linkPhone,
      descAddress:descAddress,
      lat:lat,
      lon:lon,
    }).then(function (res) {
      console.log(res)
      if (res.resultCode == 1) {
        wx.showToast({
          title: res.result,
          icon: 'none',
          duration: 1000
        })
        wx.navigateTo({
          url:'../addressList/addressList'
        })
      }else{
        wx.showToast({
          title: res.result,
          icon: 'none',
          duration: 1000
        })
      }
    });
    // wx.navigateTo({
    //   url:'../addressList/addressList'
    // })
   },
 })