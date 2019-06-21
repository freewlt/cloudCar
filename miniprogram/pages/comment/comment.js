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
    starDesc: '非常满意，无可挑剔',
    stars: [{
      lightImg: '../../images/starSel.png',
      blackImg: '../../images/star.png',
      flag: 1,
      message: '非常不满意，各方面都很差'
    }, {
      lightImg: '../../images/starSel.png',
      blackImg: '../../images/star.png',
      flag: 1,
      message: '不满意，比较差'
    }, {
      lightImg: '../../images/starSel.png',
      blackImg: '../../images/star.png',
      flag: 1,
      message: '一般，还要改善'
    }, {
      lightImg: '../../images/starSel.png',
      blackImg: '../../images/star.png',
      flag: 1,
      message: '比较满意，仍要改善'
    }, {
      lightImg: '../../images/starSel.png',
      blackImg: '../../images/star.png',
      flag: 1,
      message: '非常满意，无可挑剔'
    }],
    assessLists: ['速度快', '车辆好', '态度好', '服务好'],
    currentTab:0,
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
   //订单展开收起
   trangerBtn:function(){
      this.setData({
        isShow : !this.data.isShow
      })
   },
  //  评价星星
   starClick: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    // 评价星星文字说明
    this.setData({
      starDesc: this.data.stars[index].message
    })
  },

  // 选择评语
  assessBtn:function(e){
    var that = this;
    this.setData({
      currentTab: e.currentTarget.id,
    })
  },
  
  //  提交
  formSubmit: function(e) {
    console.log(e)
    wx.switchTab ({
      url: '../home/home',
    })
  },
  formReset: function() {
    console.log('form发生了reset事件')
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

