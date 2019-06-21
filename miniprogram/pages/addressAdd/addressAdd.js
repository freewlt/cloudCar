// pages/detailPerson/detailPerson.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'地址列表',
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
  //定位
   location:function(){
    wx.navigateTo({
      url:'../map/map'
    })
   },
  //保存
   formSubmit:function(){
    wx.navigateTo({
      url:'../addressList/addressList'
    })
   },
 })