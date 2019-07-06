// pages/maps/maps.js
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import amapFile from '../../utils/amap-wx.js';
import utilMd5 from '../../utils/md5.js';
var app = getApp();
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
    choseTime:'',
    key: 'c290b7e016c85e8f279b2f80018c6fbf',
    currentLo : null,
    currentLa : null,
    newCurrentLo : null,
    newCurrentLa : null,
    distance : 0,
    duration : 0,
    markers : null,
    scale: 16,
    polyline: null,
    statusType: 'car',
    includePoints:[],
    current:0,
  },
  onLoad(){
    var _this = this;
    _this.fetchData();
    _this.getStartAddressBtn();
    _this.currenTimeBtn()
  },
  //获取数据
  fetchData:function(){
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
            itemList:res.list,
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
  
  currenTimeBtn:function(){
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail')
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    // var carId = _this.data.carId;
      this.setData({
        time: TIME,
      });
      util.request(api.getInfoByCarid,{
        userId:userId,
        appId:appid,
        token:token,
        carId:12,
      }).then(function (res) {
        if (res.resultCode == 1) {
          console.log(res)
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
  // carTypeBtn: function (e) {
  //   this.setData({
  //       index: e.detail.value
  //   })
  // },
  getStartAddressBtn:function(){
    var _this =this;
    wx.getLocation({
      success(res){
        _this.setData({ 
          currentLo: res.longitude, 
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            iconPath: '../../images/startBig.png',
            width: 32,
            height: 32
          },{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            iconPath: '../../images/endBig.png',
            width: 32,
            height: 32
          }]
        });
      }
    })
  },
  getAddress(e){
    var _this = this;
    wx.chooseLocation({
      success(res){
        console.log(res)
        var markers = _this.data.markers;
        markers.push({
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          iconPath: '../../images/startBig.png',
          width: 32,
          height: 32
        },{
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          iconPath: '../../images/endBig.png',
          width: 32,
          height: 32
        });
        var points = _this.data.includePoints;
        points.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        var id = e.currentTarget.dataset.id;
        if(id==1){
          _this.setData({
            newCurrentLo: res.longitude,
            newCurrentLa: res.latitude,
            includePoints: points,
            markers: markers,
            show:true,
            startAddress:res.address,
          });
        }else{
          _this.setData({
            newCurrentLo: res.longitude,
            newCurrentLa: res.latitude,
            includePoints: points,
            markers: markers,
            show:true,
            endAddress:res.address,
          });
        }
        _this.getPolyline(_this.data.statusType);
      }
    });
  },
  drawPolyline(self,color){
    return {
      origin: this.data.currentLo + ',' + this.data.currentLa,
      destination: this.data.newCurrentLo + ',' + this.data.newCurrentLa,
      success(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        self.setData({
          distance: data.paths[0].distance,
          duration: parseInt(data.paths[0].duration/60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
      }
    }
  },
  getPolyline(_type){
    var amap = new amapFile.AMapWX({ key: this.data.key });
    var self = this;
    switch (_type){
      case 'car':
        amap.getDrivingRoute(this.drawPolyline(this,"#0091ff"));
        break;
      case 'walk':
        amap.getWalkingRoute(this.drawPolyline(this, "#1afa29"));
        break;
      case 'ride':
        amap.getRidingRoute(this.drawPolyline(this, "#1296db"));
        break;
      default:
        return false;
    }
  },
  // goTo(e){
  //   var _type = e.currentTarget.dataset.type;
  //   this.setData({statusType : _type});
  //   this.getPolyline(_type);
  // },
   //选择车型
   goTo(e){
    var _this = this;
    _this.setData({
      current: e.target.dataset.id,
    })
    var _type = _this.data.current;
    this.setData({statusType : _type});
    this.getPolyline(_type);
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
    var userId=userDetail.id;
    var token=userDetail.token;
    var parentId=userDetail.parentId;
    var createUserId=userDetail.createUserId;
    var linkMan = userDetail.linkMan;
    var linkPhone = userDetail.linkPhone;
    var startAddress = _this.data.startAddress;
    var startlat = _this.data.currentLa;
   var startlon = _this.data.currentLo;
    //var endLinkMan = _this.data.deliveryInfoShou.linkMan;
    //var endLinkPhone = _this.data.deliveryInfoShou.linkPhone;
    var distance = _this.data.distance;
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
      startlat:startlat,
      startlon:startlon,
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
      distance:distance,
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