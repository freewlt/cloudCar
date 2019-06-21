// pages/personalData/personalData.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'资料',
    list:[
      {title:'名称',num:'哈里贝利',path:'../nickName/nickName?index=1'},
      {title:'修改密码',num:'',path:'../changePassword/changePassword'},
      {title:'联系人',num:'张先生',path:'../nickName/nickName?index=2'},
      {title:'绑定手机号',num:'18611898100',path:'../changePhone/changePhone'},
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
   //昵称
   nickName:function(){
     wx.navigateTo({
      url:'../nickName/nickName'
    })
   }

 })