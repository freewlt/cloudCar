// pages/sameVehicle/sameVehicle.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'同城整车',
    itemList: ['顺风车', '专车', '私家车', '出租车'],
    index:0
   },
  onLoad: function (options){
   },
  // 选择车类型
  // carTypeBtn:function(){
  //     wx.showActionSheet({
  //       itemList: ['顺风车', '专车', '私家车', '出租车'],
  //       success: function(res) {
  //         this.setData({
  //           index: e.detail.value
  //       })
  //       },
  //       fail: function(res) {
  //           console.log(res.errMsg)
  //       }
  //   })
  // },
    carTypeBtn: function (e) {
      this.setData({
          index: e.detail.value
      })
    },
  
  
 })
