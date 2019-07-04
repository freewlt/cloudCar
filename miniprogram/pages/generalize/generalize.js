// pages/generalize/generalize.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title:'推广二维码',
    wx:'../../images/WX.png',
    apipay:'../../images/WX.png',
   },
  onLoad: function (){
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail');
    var appid=app.globalData.appid;
    var appid ='wx0b5fd5d4d5f1dd68';
    var userId=userDetail.id;
    var token=userDetail.token;
    var pwsDetail = wx.getStorageSync('password');
    this.setData({
      time: TIME,
    });
    util.request(api.MemberQueryEmployee,{
      userId:userId,
      appId:appid,
      token:token,
      pws:pwsDetail,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
    }).then(function (res) {
      console.log(res)
      if (res.resultCode == 1) {
        var id = res.id;
        var companyId = res.companyId;
        var memberCode = 'https://app.ycl56.com /emc/memberAppReg?id='+id+"&companyId="+companyId;
        var sijiCode ='https://app.ycl56.com /emc/dervierAppReg?id='+id+"&companyId="+companyId;
        _this.setData({
          wx:memberCode,
          apipay:sijiCode
        })
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

 })