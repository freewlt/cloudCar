// pages/sameVehicle/sameVehicle.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'同城整车',
    itemList: ['顺风车', '专车', '私家车', '出租车'],
    index:0,
    date: '2019-06-25',
    time:''
   },
  onLoad: function (options){
    var TIME = util.formatTime(new Date());
      this.setData({
        time: TIME,
      });
   },
  //返回按钮
  onMyEvent: function(e){
    let pages = getCurrentPages();
   // 获取上一级页面，即pageA的page对象
   let prevPage = pages[pages.length - 2];
   let prevPageData = prevPage.data;
   prevPage.onLoad();
   wx.navigateBack({
     delta: 1
   })
  },
   //选择车型
   carTypeBtn: function (e) {
     this.setData({
         index: e.detail.value
     })
   },
   // 选择时间
  bindDateChange:function(e){
    if(this.data.time<e.detail.value){

      this.setData({
        date: e.detail.value
      })
    }else{
      wx.showToast({
        title: '所选时间须大于当前时间',
        icon: 'none',
        duration: 1000,
        mask:true
    })
    }
  },
  //提交
  formSubmit: function(e) {
    wx.switchTab ({
      url: '../home/home',
    })
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
  
  
 })
