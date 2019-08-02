// pages/express/express.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title: '寄件发货',
    itemList: ['kg','t'],
    time: '',
    currentTab: 0,
    index: 0,
    numList: ['现结', '到付', '月结'],
    deliveryInfo: {},
    deliveryInfoShou: {},
    goodsName:'',
    dunWeight:'',
    piece:'',
    emergencycurrentTab:true,
    emergency:'紧急',
    emergencyState:0,
    memo:'',
    date:'',
    disabled:false,//设置是否能点击 false可以 true不能点击
    startDate:2019,
    endDate:2029,
    choseTime:''
  },
  onLoad: function (options) {
    var _this = this;
    var TIME = util.formatTime(new Date());

    wx.getStorage({
      key: 'deliveryInfo',
      success: function (res) {
        _this.setData({
          deliveryInfo: res.data,
        })
      }
    })
    wx.getStorage({
      key: 'deliveryInfoShou',
      success: function (res) {
        _this.setData({
          deliveryInfoShou: res.data,
        })
      }
    })
    this.setData({
      time: TIME,
      date:TIME,
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
  getNameValue: function (e) {
    this.setData({
      goodsName: e.detail.value
    })
  },
  getDunValue: function (e) {
    this.setData({
      dunWeight: e.detail.value
    })
  },
  getPieceValue: function (e) {
    this.setData({
      piece: e.detail.value
    })
  },
  getMemoValue: function (e) {
    this.setData({
      memo: e.detail.value
    })
  },
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

  //返回按钮
  onMyEvent: function (e) {
    let pages = getCurrentPages();
    //获取上一级页面，即pageA的page对象
    let prevPage = pages[pages.length - 2];
    let prevPageData = prevPage.data;
    prevPage.onLoad();
    prevPage.setData({
      isRefresh: true
    });
    wx.navigateBack({
      delta: 1
    })
  },
  // 收发货信息
  deliveryInfo: function () {
    wx.setStorage({
      key: 'expressPageData',
      data: { selectedAddressType: 'deliveryInfo', currentSelectedId: this.data.deliveryInfo.id },
      complete: ()=>{ 
        wx.navigateTo({
          url: '../addressList/addressList'
        })
      }
    });
  },
  deliveryInfoShou: function () {
    wx.setStorage({
      key: 'expressPageData',
      data: { selectedAddressType: 'deliveryInfoShou', currentSelectedId: this.data.deliveryInfoShou.id },
      complete: ()=>{
        wx.navigateTo({
          url: '../addressList/addressList',
        })
      }
    });
  },
  //选择重量
  weightBtn: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  handleNumItem: function (e) {
    var that = this;
    this.setData({
      currentTab: e.currentTarget.id,
    })
  },
  detailList: function () {
    wx.navigateTo({
      url: '../detailList/detailList',
    })
  },
  //提交
  formSubmit: function (e) {
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    var parentId=userDetail.parentId;
    var createUserId=userDetail.createUserId;
    var goodsHostName=userDetail.companyName;
    console.log('2131'+goodsHostName)
    var linkMan = _this.data.deliveryInfo.linkMan;
    var linkPhone = _this.data.deliveryInfo.linkPhone;
    var startAddress = _this.data.deliveryInfo.descAddress;
    var startlat = _this.data.deliveryInfo.lat;
    var startlon = _this.data.deliveryInfo.lon;
    var endLinkMan = _this.data.deliveryInfoShou.linkMan;
    var endLinkPhone = _this.data.deliveryInfoShou.linkPhone;
    var endAddress = _this.data.deliveryInfoShou.descAddress;
    var dunWeight = _this.data.dunWeight;
    
    var goodsName = _this.data.goodsName;
    var piece = _this.data.piece;
    var choseTime = _this.data.choseTime;
    var emergencyState = _this.data.emergencyState;
    var memo = _this.data.memo;
    var payCycle =1;
    if(_this.data.currentTab==0){
      payCycle=1;
    } else if (_this.data.currentTab==1){
      payCycle=2;
    }else if(_this.data.currentTab==2){
      payCycle=3;
    }
    console.log("payCycle:" + payCycle);
    this.setData({
      time: TIME,
    });
    //开始验证
    util.request(api.AddGoodsMenuSendingOrder,{
      userId:userId,
      appId:appid,
      token:token,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
      products:'',
      productNu:'',
      startAddress:startAddress,
      linkMan:linkMan,
      linkPhone:linkPhone,
      startlat:startlat,
      startlon:startlon,
      endAddress:endAddress,
      endLinkMan:endLinkMan,
      endLinkPhone:endLinkPhone,
      companyId:parentId,
      companyUserId:createUserId,
      dunWeight:dunWeight,
      goodsName:goodsName,
      goodsHostName:goodsHostName,
      carTypeIds:36,
      // useCarType
      requestList:goodsHostName,
      orderType:'3',
      payCycle: payCycle,
      amount:0,
      time:choseTime,
      piece:piece,
      distance:0,
      emergencyState:emergencyState,
      memo:memo,
      requestList: memo,
    }).then(function (res) {
      if (res.resultCode == 1) {
        //提示上传成功!
        wx.showModal({
          title: '提示:',
          content: '下单成功！返回上一页面',
          success:function(e){
            if(e.confirm){
              //清楚缓存
              wx.setStorage({
                key: 'deliveryInfo',
                data: '',
                key:'deliveryInfoShou',
                data:''
              })
            }else{

            }
          }
        })
      }
    });
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }

})

