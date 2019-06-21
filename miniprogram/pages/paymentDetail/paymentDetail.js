// pages/map/map.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'已完成', 
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
      latitude: 22.099994,
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
  //  评论
  commentBtn:function(){
    wx.navigateTo({
      url:'../comment/comment'
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

