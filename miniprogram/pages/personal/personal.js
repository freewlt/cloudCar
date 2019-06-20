// pages/personal/personal.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    wxHead:"../../images/wxHead.png",
    nickname:'哈利备用',
    detail:'15844551488',
    list:[
      {title:'账户余额',num:'500.00',pic:'../../images/money.png',path:'../balance/balance'},
      {title:'订单记录',num:'100',pic:'../../images/order.png',path:'../orderRecord/orderRecord'},
      {title:'推广二维码',pic:'../../images/WX.png',path:'../generalize/generalize'},
      {title:'一键客服',pic:'../../images/personService.png',path:''},
    ]
   },
  onLoad: function (options){
      var that = this;
   },

   //个人资料
   personalData:function(){
      wx.navigateTo({
        url:'../personalData/personalData'
      })
   }
 
 })
