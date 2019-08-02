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
    companyPhone:'',
    list:[
      {id:1,title:'推广二维码',pic:'../../images/WX.png',path:'../generalize/generalize'},
      {id:2,title:'一键客服',pic:'../../images/personService.png',path:''},
    ]
   },
  onLoad: function (){
    var _this = this;
    console.log("12");
    wx.getUserInfo({
      success: function (res) {
        console.log("12" + userInfo.nickName);
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log("nickName:" + nickName + ",avatarUrl:" + avatarUrl + ",gender" + gender)
          _this.setData({
            wxHead: avatarUrl,
            nickname:nickName,
          });
        
      }
    });
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    _this.setData({
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
          nickname:res.companyName,
          companyPhone:res.companyPhone,
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
   },
  //拨打电话
  listBtn: function (e) {
    if (e.currentTarget.dataset.id == 2) {
      var companyphone = wx.getStorageSync('companyPhone');
      wx.makePhoneCall({
        phoneNumber: companyphone //仅为示例，并非真实的电话号码
      })
    }
  },
 })
