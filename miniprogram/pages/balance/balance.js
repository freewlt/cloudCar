// pages/balance/balance.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'账户余额',
    messageNum:'充值',
    backPic:'../../images/back.png',
    backTxt:'返回',
    balance:'300.00',
    deliveryInfo:[
      {time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',price:'+30',username:'张三'},
      {time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',price:'-30',username:'张三'},
    ]
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
  //充值
  rechargeBtn:function(){
    wx.switchTab ({
      url:'../home/home'
    })
  },

 })



