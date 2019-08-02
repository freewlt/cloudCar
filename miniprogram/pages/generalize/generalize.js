// pages/generalize/generalize.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';
import QRCode from '../../utils/qrcode.js'

Page({
  data: {
    title:'推广二维码',
    Member:'',
    Siji:'',
   },
  onLoad: function (){
    this.fetachData();
    var _this = this;
   // var member = _this.data.Member;
   // var siji = _this.data.Siji;
    //console.log(member+","+siji);
   
   },
   fetachData:function(){
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
      if (res.resultCode == 1) {
        var companyId = res.companyId;
        var employeeIdNew = res.employeeId;
        var memberCode = 'https://app.ycl56.com/emc/memberAppReg?id='+employeeIdNew+"&companyId="+companyId;
        var sijiCode ='https://app.ycl56.com/emc/dervierAppReg?id='+employeeIdNew+"&companyId="+ companyId;
        _this.createQrCode(memberCode, 'canvasMember', 150, 150)
        _this.createQrCode(sijiCode, 'canvasSiji', 150, 150)
        console.log(memberCode + "," + sijiCode)
       // _this.setData({
         // Member:memberCode,
         // Siji:sijiCode
       // })
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
  createQrCode: function (content, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QRCode.api.draw(content, canvasId, cavW, cavH);
    this.canvasToTempImage(canvasId);
  },
  
  //获取临时缓存图片路径，存入data中
  canvasToTempImage: function (canvasId) {
    let _this = this;
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId,   // 这里canvasId即之前创建的canvas-id
        success: function (res) {
          let memberCode = _this.data.Member;
          let sijiCode = _this.data.siji;
          console.log(memberCode);
          _this.setData({ 
            Siji:sijiCode,     
            Member:memberCode,  
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
     }, 500) 
    
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