// pages/sysMes/sysMes.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'系统消息',
    currentTab: 0,
    index: 0, 
    tabTitleList:['已读','未读'],
    messList:[
      {message:'支付成功',time:'2019-5-24 17:36:35'},
      {message:'支付成功',time:'2019-5-24 17:36:35'},
    ],
    
   },
  onLoad: function (){
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
  //获取当前滑块的index
   bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
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
        currentData: e.target.dataset.current
      })
    }
  }

 })