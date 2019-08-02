// pages/detailPerson/detailPerson.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title: '修改地址',
    linkMan: '',
    linkPhone: '',
    descAddress: '',
    lat: '',
    lon: '',
    id:''
  },
  onLoad: function (options) {
    var _this = this;
    console.log(options.id+","+options.lat+","+options.lon);
    if(options.index==0){
      _this.setData({
        linkMan:options.linkMan,
        linkPhone:options.linkPhone,
        descAddress:options.descAddress,
        lat:options.lat,
        lon:options.lon,
        id:options.id
      })
    }
  },

  //获取input输入框的值
  getManValue: function (e) {
    this.setData({
      linkMan: e.detail.value
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
  onMyEvent: function (e) {
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
  location: function () {
    var _this=this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
         _this.setData({
          lat: res.latitude,
          lon:res.longitude,
          descAddress:res.address,
          })
      
      }
    })
  
  },
  //保存
  formSubmit: function () {
    
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid = app.globalData.appid;
    var userId = userDetail.id;
    var token = userDetail.token;
    var linkMan = _this.data.linkMan;
    var linkPhone = _this.data.linkPhone;
    var descAddress = _this.data.descAddress;
    var lat = _this.data.lat;
    var lon = _this.data.lon;
    var id=_this.data.id;
    console.log("id"+id+','+api.updatePiecesAddress);
    util.request(api.updatePiecesAddress, {
      userId: userId,
      appId: appid,
      token: token,
      timeStamp: TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
      id:id,
      linkMan: linkMan,
      linkPhone: linkPhone,
      descAddress: descAddress,
      lat: lat,
      lon: lon,
    }).then(function (res) {
      if (res.resultCode == 1) {
      //
        wx.showModal({
          title: '提示',
          content: '修改成功,是否返回上页面',
          success: function (e) {
            if (e.confirm) {
            wx.navigateBack({
              data:1,
            })
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            }
          }
        })
       
      }
    });
  },
})