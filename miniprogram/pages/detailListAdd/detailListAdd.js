// pages/detailListAdd/detailListAdd.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'添加产品',
    index:0,
    itemList: ['个', '件', 't']
   },
  onLoad: function (options){
   },
  //选择重量
  weightBtn: function (e) {
    this.setData({
        index: e.detail.value
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

