// pages/cityTravel/cityTravel.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title:'同城整车',
    itemList: [],
    time:'',
    currentTab: 0,
    index: 0, 
    numList:['01','02','03','04','05','06','07'],
    goodsName:'',
    dunWeight:'',
    piece:'',
    emergencycurrentTab:true,
    emergency:'紧急',
    emergencyState:0,
    memo:'',
    startAddress:'',
    endAddress:'',
    date:'2021-01-01 12:38',
    disabled:false,//设置是否能点击 false可以 true不能点击
    startDate:2019,
    endDate:2023,
    choseTime:''
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
      });
      util.request(api.carTypeVehicleQuery,{
        userId:userId,
        appId:appid,
        token:token,
        vehicleType:1,
      }).then(function (res) {
        if (res.resultCode == 1) {
          _this.setData({
            itemList: res.list.map((it) => it.carType)
          })
        }else{
          wx.showToast({
            title: res.result,
            icon: 'none',
            duration: 1000
          })
        }
      });
   },
   /**
   * 日历控件绑定函数 
   * 点击日期返回
   */
  onPickerChange: function (e) {
    var choseTime = util.formatTime(e.detail.date);
    this.setData({
      date: e.detail.dateString,
      choseTime:util.formatTime(e.detail.date),
    })
  },
   //获取input输入框的值
  getstartAddressValue: function (e) {
    this.setData({
      startAddress: e.detail.value
    })
  },
  getendAddressValue: function (e) {
    this.setData({
      endAddress: e.detail.value
    })
  },
  // getPieceValue: function (e) {
  //   this.setData({
  //     piece: e.detail.value
  //   })
  // },
  // getMemoValue: function (e) {
  //   this.setData({
  //     memo: e.detail.value
  //   })
  // },
   emergencyBtn:function(e){
    var _this = this;
    if(_this.data.emergencycurrentTab == true){
      _this.setData({
        emergency: '不紧急',
        emergencycurrentTab:!_this.data.emergencycurrentTab,
        emergencyState:1
      })
    }else{
      _this.setData({
        emergency: '紧急',
        emergencycurrentTab:!_this.data.emergencycurrentTab,
        emergencyState:0
      })
    }
  },
   
  //返回
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
  //选择车型
  carTypeBtn: function (e) {
    this.setData({
        index: e.detail.value
    })
  },
  //选择时间
  bindDateChange:function(e){
    if(this.data.time<e.detail.value){

      this.setData({
        date: e.detail.value
      })
    }else{
      wx.showToast({
        title: '所选时间须大于当前时间',
        icon: 'none',
        duration: 1000,
        mask:true
    })
    }
  },
  handleNumItem: function (e) {
    var that = this;
    this.setData({
      currentTab: e.currentTarget.id,
    })
  },
  //提交
  formSubmit: function (e) {
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var appid ='wx0b5fd5d4d5f1dd68';
    var userId=userDetail.id;
    var token=userDetail.token;
    var parentId=userDetail.parentId;
    var createUserId=userDetail.createUserId;
    var linkMan = userDetail.linkMan;
    var linkPhone = userDetail.linkPhone;
    var startAddress = _this.data.startAddress;
    //var startlat = _this.data.deliveryInfo.lat;
   // var startlon = _this.data.deliveryInfo.lon;
    //var endLinkMan = _this.data.deliveryInfoShou.linkMan;
    //var endLinkPhone = _this.data.deliveryInfoShou.linkPhone;
    var endAddress = _this.data.endAddress;
    var dunWeight = _this.data.dunWeight;
    var goodsName = _this.data.goodsName;
    var piece = _this.data.piece;
    var choseTime = _this.data.choseTime;
    var emergencyState = _this.data.emergencyState;
    var memo = _this.data.memo;
    this.setData({
      time: TIME,
    });
    
    util.request(api.AddMenuGoodsOrder,{
      userId:userId,
      appId:appid,
      token:token,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
      products:'',
      // productNu:'',
      startAddress:startAddress,
      linkMan:linkMan,
      linkPhone:linkPhone,
      startlat:'startlat',
      startlon:'startlon',
      endAddress:endAddress,
      endLinkMan:'endLinkMan',
      endLinkPhone:'endLinkPhone',
      companyId:parentId,
      companyUserId:createUserId,
      dunWeight:dunWeight,
      goodsName:goodsName,
      // carTypeIds
      // useCarType
      // requestList
      orderType:'1',
      amount:0,
      time:choseTime,
      piece:piece,
      distance:200,
      emergencyState:emergencyState,
      memo:memo
    }).then(function (res) {
      if (res.resultCode == 1) {
        if(startAddress == ""){
          wx.showToast({
            title: '起点地址不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        // if(linkMan == ""){
        //   wx.showToast({
        //     title: '发货人不能为空',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return false;
        // }
        // if(linkPhone == ""){
        //   wx.showToast({
        //     title: '发货人电话不能为空',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return false;
        // }
        // if(endAddress == ""){
        //   wx.showToast({
        //     title: '终点地址不能为空',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return false;
        // }
        // if(endLinkMan == ""){
        //   wx.showToast({
        //     title: '收货人不能为空',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return false;
        // }
        // if(endLinkPhone == ""){
        //   wx.showToast({
        //     title: '收货人电话不能为空',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return false;
        // }
        // if(dunWeight == ""){
        //   wx.showToast({
        //     title: '吨数不能为空',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return false;
        // }
        // if(goodsName == ""){
        //   wx.showToast({
        //     title: '货物名称不能为空',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return false;
        // }
        // if(piece == ""){
        //   wx.showToast({
        //     title: '件数不能为空',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return false;}
        else{
          wx.switchTab({
            url: '../home/home',
          })
          wx.hideLoading();
        }
      }else{
        wx.showToast({
          title: res.result,
          icon: 'none',
          duration: 1000
        })
      }
    });
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
  
 })
