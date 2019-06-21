// pages/addressList/addressList.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'地址列表',
    deleteNum:'删除',
    backPic:'../../images/back.png',
    backTxt:'返回',
    currentTab: 0,
    index: 0, 
    deliveryInfo:[
      {detailName:'发货人信息',name:'张三',phone:'15811428566',address:"北京市恒大御景湾"},
      {detailName:'收货人信息',name:'李四',phone:'15811428566',address:"北京市恒大御景湾"},
    ]
   },
  onLoad: function (){
   },
  //返回按钮
  onMyEvent: function(e){
    let pages = getCurrentPages();
   //获取上一级页面，即pageA的page对象
   let prevPage = pages[pages.length - 2];
   let prevPageData = prevPage.data;
   prevPage.onLoad();
   wx.navigateBack({
     delta: 1
   })
  },
   //选择地址
  deliveryInfo:function(e){
    var that = this;
    that.setData({
      currentTab: e.currentTarget.id,
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
