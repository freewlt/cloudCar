// pages/detailPerson/detailPerson.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title: '地址列表',
    linkMan: '',
    linkPhone: '',
    descAddress: '',
    lat: '',
    lon: '',
  },
  onLoad: function (options) {
    var _this = this;
    if(options.index==0){
      _this.setData({
        linkMan:options.linkMan,
        linkPhone:options.linkPhone,
        descAddress:options.descAddress
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
    wx.navigateTo({
      url: '../map/map'
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
    util.request(api.addPiecesAddress, {
      userId: userId,
      appId: appid,
      token: token,
      timeStamp: TIME,
      //sign:utilMd5.hexMD5(token + appid + TIME),
      linkMan: linkMan,
      linkPhone: linkPhone,
      descAddress: descAddress,
      lat: lat,
      lon: lon,
    }).then(function (res) {
      if (res.resultCode == 1) {
        var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
        if(linkPhone == ""){
          wx.showToast({
            title: '手机号不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }else if(!myreg.test(linkPhone)){
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if(linkMan == ""){
          wx.showToast({
            title: '姓名不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if(descAddress == ""){
          wx.showToast({
            title: '地址不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if(lon == ""){
          wx.showToast({
            title: '纬度不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if(lat == ""){
          wx.showToast({
            title: '经度不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }else{
          wx.navigateTo({
            url: '../addressList/addressList'
          })
        }
      } else {
        wx.showToast({
          title: res.result,
          icon: 'none',
          duration: 1000
        })
      }
    });
  },
})