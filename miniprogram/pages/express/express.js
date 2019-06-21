// pages/express/express.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'同城速运',
    itemList: ['kg', 'g', 't'],
    date: '2019-06-25',
    time:'',
    currentTab: 0,
    index: 0, 
    numList:['现结','到付','月结'],
    deliveryInfo:[
      {detailName:'发货人信息',name:'张三',phone:'15811428566',address:"北京市恒大御景湾"},
      {detailName:'收货人信息',name:'李四',phone:'15811428566',address:"北京市恒大御景湾"},
    ]
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
   //获取上一级页面，即pageA的page对象
   let prevPage = pages[pages.length - 2];
   let prevPageData = prevPage.data;
   prevPage.onLoad();
   wx.navigateBack({
     delta: 1
   })
  },
  //  收货信息
  deliveryInfo:function(){
    wx.navigateTo({
      url:'../addressList/addressList'
    })
  },
  //选择重量
  weightBtn: function (e) {
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
  handleNumItem: function (e) {
    var that = this;
    this.setData({
      currentTab: e.currentTarget.id,
    })
  },
  detailList:function(){
    wx.navigateTo({
      url: '../detailList/detailList',
    })
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

