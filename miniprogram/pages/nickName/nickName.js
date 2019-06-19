// pages/nickName/nickName.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'资料',
    nickTitle:'名称',
    nickName:"请输入"
    
   },
  onLoad: function (options){
    console.log(options)
    if(options.index==1){
      this.setData({
        nickTitle:'名称',
      })
    }
    if(options.index==2){
      this.setData({
        nickTitle:'联系人',
      })
    }
   },
   backBtn:function(){
    //  util.request(api.IndexUrlNewGoods,{nickName:this.data.nickName}).then(function (res) {
    //   if (res.errno === 0) {}
       
    // });
   }

 })