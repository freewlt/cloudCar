// pages/addressList/addressList.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title:'地址列表',
    deleteNum:'删除',
    backPic:'../../images/back.png',
    backTxt:'返回',
    currentTab: 0,
    index: 0, 
    deliveryInfo:[],
    dataId:''
   },
  onLoad: function (option){
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    this.setData({
      time: TIME,
      dataId:option.id
    });
    console.log(_this.data.dataId,'_this.data.dataId')
    console.log(option.id,'option.id')
    util.request(api.getPiecesAddress,{
      userId:userId,
      appId:appid,
      token:token,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
      state:'5',
      pageIndex:'0',
      pageSize:'12'
    }).then(function (res) {
      if (res.resultCode == 1) {
        _this.setData({
          deliveryInfo:res.list
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
   // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    this.setData({
      time: TIME,
    });
    util.request(api.getPiecesAddress,{
      userId:userId,
      appId:appid,
      token:token,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
      state:'5',
      pageIndex:'0',
      pageSize:'12'
    }).then(function (res) {
      if (res.resultCode == 1) {
        _this.setData({
          // itemList: res.list.map((it) => it.carType)
          deliveryInfo:res.list
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }else{
        wx.showToast({
          title: res.result,
          icon: 'none',
          duration: 1000
        })
      }
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    this.setData({
      time: TIME,
    });
    util.request(api.getPiecesAddress + page,{
      userId:userId,
      appId:appid,
      token:token,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
      state:'5',
      pageIndex:'0',
      pageSize:'12'
    }).then(function (res) {
      if (res.resultCode == 1) {
        _this.setData({
          // itemList: res.list.map((it) => it.carType)
          deliveryInfo:res.list
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
   //选择地址
  deliveryInfo:function(e){
    var _this = this;
    _this.setData({
      currentTab: e.currentTarget.id,
    })
    if(_this.data.dataId == 0){
      wx.setStorage({key:"concatDetail",data:{
        linkMan:_this.data.deliveryInfo[e.currentTarget.id].linkMan,
        linkPhone:_this.data.deliveryInfo[e.currentTarget.id].linkPhone,
        descAddress:_this.data.deliveryInfo[e.currentTarget.id].descAddress}})
    }else if(_this.data.dataId == 1){
      wx.setStorage({key:"concatDetailShou",data:{
        linkMan:_this.data.deliveryInfo[e.currentTarget.id].linkMan,
        linkPhone:_this.data.deliveryInfo[e.currentTarget.id].linkPhone,
        descAddress:_this.data.deliveryInfo[e.currentTarget.id].descAddress}})
    }
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
  //  删除
  deleteBtn:function(e){
    var current = e.currentTarget.dataset.index;
    var list=this.data.deliveryInfo;
    list.splice(current,1)
    this.setData({
      deliveryInfo: list
    })
  },
  //  编辑
  editBtn: function() {
    wx.navigateTo({
      url:'../addressAdd/addressAdd'
    })
  },
   //提交
  formSubmit: function(e) {
    wx.navigateTo({
      url:'../addressAdd/addressAdd'
    })
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
 })
