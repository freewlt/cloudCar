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

   //昵称
   nickName:function(){
     wx.navigateTo({
      url:'../nickName/nickName'
    })
   }

 })