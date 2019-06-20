// pages/sysMes/sysMes.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'配车中',
    startAddress:'北京市朝阳区',
    endAddress:'北京市昌平区',
    deliveryInfo:[
      {username:'张三',seat:'七座小客车',dispatcher:'整车/拼车',num:'2',weight:'20.00',weightCar:'4.00*2.00*16.00',bulk:'16.00'},
      {username:'张三',seat:'七座小客车',dispatcher:'整车/拼车',num:'3',weight:'200.00',weightCar:'4.00*2.00*16.00',bulk:'17'},
      {username:'张三',seat:'七座小客车',dispatcher:'整车/拼车',num:'4',weight:'20.00',weightCar:'4.00*2.00*16.00',bulk:'28'},
      {username:'张三',seat:'七座小客车',dispatcher:'整车/拼车',num:'5',weight:'20.00',weightCar:'4.00*2.00*16.00',bulk:'41'},
    ],
    notice:'已通知已下车主等待接单中......'
   },
  onLoad: function (){
   
  },
  //选择菜单
  menuBtn:function(){
    wx.showActionSheet({
      itemList: ['重新发布订单', '增加小费', '取消订单', '继续等待'],
      success: function(res) {
        console.log(res.tapIndex)
        if(res.tapIndex==0){
          wx.navigateTo({
            url:'../map/map'
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
     })
  }

 })