// pages/sysMes/sysMes.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'订单记录',
    currentTab: 0,
    index: 0, 
    tabTitleList:['全部订单','配送中','已派送','已接单','待支付','已撤销'],
    deliveryInfo:[
      {time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',dispatcher:'整车/拼车',starAddress:'北京市朝阳区建国路世通国际大厦E座',endAddress:'北京市昌平区首开智慧社1号楼3单元',handle:'配车中',path:'../orderReceive/orderReceive'},
      {time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',dispatcher:'整车/拼车',starAddress:'北京市朝阳区建国路世通国际大厦E座',endAddress:'北京市昌平区首开智慧社1号楼3单元',handle:'已派车',path:'../orderReceive/orderReceive'},
      {time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',dispatcher:'整车/拼车',starAddress:'北京市朝阳区建国路世通国际大厦E座',endAddress:'北京市昌平区首开智慧社1号楼3单元',handle:'已接单',path:'../orderReceive/orderReceive'},
      {time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',dispatcher:'整车/拼车',starAddress:'北京市朝阳区建国路世通国际大厦E座',endAddress:'北京市昌平区首开智慧社1号楼3单元',handle:'待支付',path:'../orderReceive/orderReceive'},
    ]
   },
  onLoad: function (){
   },
  //获取当前滑块的index
   bindchange:function(e){
    const that  = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    var that = this;
    this.setData({
      currentTab: e.currentTarget.id,
    })
    if (that.data.currentTab === e.target.dataset.current){
        return false;
    }else{
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // handleBtn:function(){
  //   wx.navigateTo({
  //     url:'../handle/handle'
  //   })
  // }

 })