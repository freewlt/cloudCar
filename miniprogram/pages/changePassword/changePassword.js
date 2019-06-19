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
   formSubmit:function(){
    //  util.request(api.IndexUrlNewGoods,{nickName:this.data.nickName}).then(function (res) {
    //   if (res.errno === 0) {}
       
    // });
   }

 })
