// pages/detailListAdd/detailListAdd.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'添加产品',
   },
  onLoad: function (options){
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
  //提交
  formSubmit: function(e) {
    wx.navigateTo({
      url: '../detailList/detailList',
    })
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
  
 })

