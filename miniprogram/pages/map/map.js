// pages/map/map.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'同城整车', 
    markers: [{
      iconPath: "../../images/startBig.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 40,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    detail:{
      name:'专车',
      price:"30",
      time:'2019-05-22 16:20:20'
    },
    isShow: true,
    startAddress:'北京市昌平区涌鑫家园',
    endAddress:'北京市西二旗',
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
   //订单收起展开
   trangerBtn:function(){
      this.setData({
        isShow : !this.data.isShow
      })
   },
  //清单
  detailListBtn:function(){
    wx.navigateTo({
      url:'../handle/handle'
    })
  },
  //重新发布订单
  againBtn:function(){
    wx.navigateTo({
      url:'../cityTravel/cityTravel'
    })
  },
   //地图
  regionchange(e) {
    console.log('0',e.type)
  },
  markertap(e) {
    console.log('1',e.markerId)
  },
  controltap(e) {
    console.log('2',e.controlId)
  }
 })

