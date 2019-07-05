// pages/personal/personal.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    wxHead:'',
    nickname:'',
    detail:'',
    balance:'',
    count:'',
    list:[
      {title:'推广二维码',pic:'../../images/WX.png',path:'../generalize/generalize'},
      {title:'一键客服',pic:'../../images/personService.png',path:''},
    ]
   },
  onLoad: function (){
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    this.setData({
      time: TIME,
      wxHead:app.globalData.avatarUrl,
      nickname:app.globalData.nickName
    });
    util.request(api.queryGoodsCompanyInfo,{
      userId:userId,
      appId:appid,
      token:token,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
    }).then(function (res) {
      if (res.resultCode == 1) {
        _this.setData({
          detail:res.linkPhone,
          balance:res.balance,
          count:res.count,
        })
        // 隐藏加载框
        wx.hideLoading();
      }else{
        wx.showToast({
          title: res.result,
          icon: 'none',
          duration: 1000
        })
      }
    });
   },
   //个人资料
   personalData:function(){
      wx.navigateTo({
        url:'../personalData/personalData'
      })
   }
 
 })
