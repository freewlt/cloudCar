// pages/map/map.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'已接单', 
    markers: [{
      iconPath: "../../images/startBig.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 40,
      height: 50
    },{
      iconPath: "../../images/endBig.png",
      id: 0,
      latitude: 20.099994,
      longitude: 110.324520,
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
    detailList:[
      {name:"张三",list:'15844147822'},
      {name:"车辆信息",list:'冀F09W45 现代瑞纳'},
      {name:"发货寄件",list:'20'},
      {name:"时间",list:'2019-05-22 16:20:20'},
    ],
    isShow: true,
    startAddress:'北京市昌平区涌鑫家园',
    endAddress:'北京市西二旗',
   },

  onLoad: function (options){
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
   //订单展开收起
   trangerBtn:function(){
      this.setData({
        isShow : !this.data.isShow
      })
   },
  //  清单
  detailListBtn:function(){
    wx.navigateTo({
      url:'../handle/handle'
    })
  },
  //  确定付款
  paymentBtn:function(){
    wx.navigateTo({
      url:'../payment/payment'
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

