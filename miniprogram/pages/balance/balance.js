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
  //  充值
  rechargeBtn:function(){
    wx.switchTab ({
      url:'../home/home'
    })
  },

 })



