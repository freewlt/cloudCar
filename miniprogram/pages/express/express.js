// pages/express/express.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'同城速运',
    itemList: ['kg', 'g', 't'],
    index:0,
    date: '2019-06-25',
    time:'',
    currentTab: 0,
    index: 0, 
    numList:['现结','到付','月结']
   },
  onLoad: function (options){
    var TIME = util.formatTime(new Date());
      this.setData({
        time: TIME,
      });
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

