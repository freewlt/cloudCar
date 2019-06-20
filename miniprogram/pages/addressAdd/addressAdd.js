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
  //  定位
   location:function(){
    wx.navigateTo({
      url:'../map/map'
    })
   },
  //  保存
   formSubmit:function(){
    wx.navigateTo({
      url:'../addressList/addressList'
    })
   },
 })