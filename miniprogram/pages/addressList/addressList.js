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
    type: ''
   },
  onLoad: function (){
    this.onrequest();
   },
  // 请求地址
   onrequest:function(){
      var _this = this;
      var TIME = util.formatTime(new Date());
      var userDetail = wx.getStorageSync('userDetail')
      var appid=app.globalData.appid;
      var userId=userDetail.id;
      var token=userDetail.token;
      var expressPageData = wx.getStorageSync('expressPageData');
      this.setData({
        time: TIME,
        currentTab: expressPageData.currentSelectedId || '',
        expressPageData,
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
    var page = 0;
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
    util.request(api.getPiecesAddress+'?page=' + page,{
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
        const oldData = _this.data.deliveryInfo;
        _this.setData({
          deliveryInfo:oldData.concat(res.data)
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
    const id = e.currentTarget.id;
    _this.setData({
      currentTab: e.currentTarget.id,
    })
    const data = _this.data.deliveryInfo.find((it) => it.id == id );
    const key = _this.data.expressPageData.selectedAddressType;
    wx.setStorage({ key, data })
  },
  //  删除
  deleteBtn:function(e){
    var _this = this;
    const id = this.data.currentTab;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var appid ='wx0b5fd5d4d5f1dd68';
    var userId=userDetail.id;
    var token=userDetail.token;
    this.setData({
      time: TIME,
    });
    util.request(api.deleteMemberMarketInfo,{
      userId:userId,
      appId:appid,
      token:token,
      timeStamp:TIME,
      Id:id,
      sign:utilMd5.hexMD5(token + appid + TIME),
    }).then(function (res) {
      if (res.resultCode == 1) {
        // 隐藏加载框
        _this.onrequest();
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
  //  编辑
  editBtn: function() {
    var _this = this;
    const id = this.data.currentTab;
    const deliveryInfoNew = _this.data.deliveryInfo.find((it) => it.id == id );

    var linkMan = deliveryInfoNew.linkMan;
    var linkPhone = deliveryInfoNew.linkPhone;
    var descAddress = deliveryInfoNew.descAddress;
    var lat=deliveryInfoNew.lat;
    var lon=deliveryInfoNew.lon;
    wx.navigateTo({
      url: `../addressEdit/addressEdit?id=${id}&linkMan=${linkMan}&linkPhone=${linkPhone}&descAddress=${descAddress}&lat=${lat}&lon=${lon}&index=0`
    })
  },
  choise:function(){
    var _this = this;
    const id = this.data.currentTab;
    const deliveryInfoNew = _this.data.deliveryInfo.find((it) => it.id == id );
    var linkMan = deliveryInfoNew.linkMan;
    var linkPhone = deliveryInfoNew.linkPhone;
    var descAddress = deliveryInfoNew.descAddress;
    var lat=deliveryInfoNew.lat;
    var lon=deliveryInfoNew.lon;
    wx.navigateTo({
      url: `../express/express?id=${id}&linkMan=${linkMan}&linkPhone=${linkPhone}&descAddress=${descAddress}&lat=${lat}&lon=${lon}&index=0`
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
