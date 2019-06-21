// pages/changePassword/changePassword.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'修改密码',
    nickTitle:'名称',
    nickName:"请输入"
    
   },
  onLoad: function (){
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
   formSubmit:function(){
    //  util.request(api.IndexUrlNewGoods,{nickName:this.data.nickName}).then(function (res) {
    //   if (res.errno === 0) {}
       
    // });
   }

 })
