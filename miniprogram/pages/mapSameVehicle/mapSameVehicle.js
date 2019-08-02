// pages/maps/maps.js
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import amapFile from '../../utils/amap-wx.js';
import utilMd5 from '../../utils/md5.js';
var app = getApp();
Page({
  data: {
    title:'同城货运',
    itemList: [],
    dunWeightItemList: ['kg', 't'],
    dunWeighindex: 0, 
    time:'',
    currentTab: 0,
    index: 0, 
    carTypeIndex: 0,
    numList:['01','02','03','04','05','06','07'],
    goodsName:'',
    dunWeight:'',
    piece:'',
    emergencycurrentTab:true,
    emergencyName: '紧急',
    emergencyState: 0,
    partAmount: 0.0,
    partAmountName: '预约发单',
    emergencyAmount: 0.0,
    amount: 0.0,
    currAmount: 0.0,
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
    statusType: '',
    includePoints:[],
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
        date: TIME,
      });
      util.request(api.carTypeVehicleQuery,{
        userId:userId,
        appId:appid,
        token:token,
        vehicleType:2,
      }).then(function (res) {

        if (res.resultCode == 1) {
          _this.setData({
            itemList: res.list,
            statusType: res.list[0].id,
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
     var TIME = util.formatTime(new Date());
     var userDetail = wx.getStorageSync('userDetail')
     var appid = app.globalData.appid;
     var userId = userDetail.id;
     var token = userDetail.token;
     var parentId = userDetail.parentId;
     var createUserId = userDetail.createUserId;
     var goodsHostName = userDetail.companyName;
     var linkMan = userDetail.companyName;
     var linkPhone = userDetail.linkPhone;
     var startAddress = _this.data.startAddress;
     var startlat = _this.data.currentLa;
     var startlon = _this.data.currentLo;
     var endlat = _this.data.newCurrentLa;
     var endlon=_this.data.newCurrentLo;
     var distance = _this.data.distance;
     var endAddress = _this.data.endAddress;
     var dunWeight = _this.data.dunWeight;
     var goodsName = _this.data.goodsName;
     var piece = _this.data.piece;
     var choseTime = _this.data.choseTime;
     var emergencyState = _this.data.emergencyState;
     var memo = _this.data.memo;
     var amount = _this.data.emergencyAmount;
     util.request(api.AddMenuGoodsOrder, {
       userId: userId,
       appId: appid,
       token: token,
       timeStamp: TIME,
       sign: utilMd5.hexMD5(token + appid + TIME),
       products: '',
       // productNu:'',
       startAddress: startAddress,
       linkMan: linkMan,
       linkPhone: linkPhone,
       startlat: startlat,
       startlon: startlon,
       endAddress: endAddress,
       endLinkMan: linkMan,
       endLinkPhone: linkPhone,
       endlat: endlat,
       endlon: endlon,
       companyId: parentId,
       companyUserId: createUserId,
       dunWeight: dunWeight,
       goodsName: goodsName,
       goodsHostName: goodsHostName,
       // carTypeIds
       // useCarType
       // requestList
       orderType: '2',
       amount: amount,
       time: choseTime,
       piece: piece,
       distance: distance,
       emergencyState: emergencyState,
       memo: memo,
       requestList: memo,
     }).then(function (res) {
       if (res.resultCode == 1) {
         //提示上传成功!s
         wx.showModal({
           title: '提示:',
           content: '下单成功！返回上一页面',
           success: function (e) {
             if (e.confirm) {
               //清楚缓存
               wx.redirectTo({
                 url: '../home/home',
               })
             } else {

             }
           }
         })
       } else {
         wx.showToast({
           title: res.result,
           icon: 'none',
           duration: 1000
         })
       }
     });
  },
  //选择重量
  weightBtn: function (e) {
    console.log('dunWeighindex:'+e.detail.value);
    this.setData({
      dunWeighindex: e.detail.value
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
  getStartAddressBtn:function(){
    var _this =this;
    wx.getLocation({
      success(res){
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: { location: res.latitude + "," + res.longitude, key: 'TQ4BZ-CDL3D-CW24Q-HBSA7-EQQA6-SXF34', get_poi: 1 },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: { apikey: 'a37c01591e47494fe320137dbc0fd423' }, // 设置请求的 header
          success: function (res) {
            // success
            console.log('---------------------->');
            var add = res.data.result.address;
            _this.setData({
              startAddress: add,
            })
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
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
        _this.getPolyline('car');
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
        var distanc = data.paths[0].distance;
        var smile = util.meterSmile(distanc);
        var statusType = self.data.statusType;//carType
        console.log('smile:' + smile + ',' + statusType);
        self.setData({
          distance: smile,
          duration: parseInt(data.paths[0].duration/60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
        //根据车辆类型,里程，计算价格,紧急每个车加20元,
        var TIME = util.formatTime(new Date());
        var userDetail = wx.getStorageSync('userDetail')
        var appid = app.globalData.appid;
        var userId = userDetail.id;
        var token = userDetail.token;
        var sign = utilMd5.hexMD5(token + appid + TIME);
        var TIME = util.formatTime(new Date());
        var userDetail = wx.getStorageSync('userDetail');
        var userId = userDetail.id;
        var token = userDetail.token;
        var sign = utilMd5.hexMD5(token + appid + TIME);
        wx.request({
          url: api.getCarTypeById,
          data: { userId: userId, id: statusType, token: token, appId: appid, timeStamp: TIME, sign: sign },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: { apikey: 'a37c01591e47494fe320137dbc0fd423' }, // 设置请求的 header
          success: function (res) {
            // success
            var basePrice = res.data.model.basePrice;
            var startMiles = res.data.model.startMiles;
            var miles = res.data.model.miles;
            var distance = self.data.distance;
            var amount = util.getAmount(basePrice, startMiles, miles, distance);

            var emergencyAmount = amount + 20;
            console.log('紧急费用' + emergencyAmount);
            self.setData({
              partAmountName: '预约发单' + amount.toFixed(2) + '元',
              emergencyName: '紧急' + emergencyAmount.toFixed(2) + '元',
              partAmount: amount.toFixed(2),
              emergencyAmount: emergencyAmount.toFixed(2),
            });
            //
            //赋值给全局变量
           

          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
       
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
  goTo(e){
    //逻辑,获取车辆类型数据,判断起始地是否选择,判断目的地是否选择，规划线路，获取里程，计算出价格
    var _type = e.currentTarget.dataset.id;
     this.setData({
      currentTab: _type,
      statusType : _type
    })
    //
    if (this.data.currentLa.length <= 0) {
      wx.showToast({
        title: '请输入起点地址！',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.newCurrentLa <= 0) {
      wx.showToast({
        title: '请输入目的地地址',
        icon: 'none',
        duration: 1000
      })
    }
     else 
     {//开始规划路线
      this.getPolyline("car");
      var dis = this.data.distance;
      console.log('距离:' + dis);
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
    var appid = app.globalData.appid;
    var userId = userDetail.id;
    var token = userDetail.token;
    var parentId = userDetail.parentId;
    var createUserId = userDetail.createUserId;
    var goodsHostName = userDetail.companyName;
    var linkMan = userDetail.companyName;
    var linkPhone = userDetail.linkPhone;
    var startAddress = _this.data.startAddress;
    var startlat = _this.data.currentLa;
    var startlon = _this.data.currentLo;
    var endlat = _this.data.newCurrentLa;
    var endlon = _this.data.newCurrentLo;
    var distance = _this.data.distance;
    var endAddress = _this.data.endAddress;
    var dunWeight = _this.data.dunWeight;
    var goodsName = _this.data.goodsName;
    var piece = _this.data.piece;
    var choseTime = _this.data.choseTime;
    var emergencyState = _this.data.emergencyState;
    var memo = _this.data.memo;
    var amount = _this.data.partAmount;
    var statusType = _this.data.statusType;
    console.log('dunWeight:' + dunWeight + ",piece:" + piece + ",goodsName" + goodsName + ",memo" + memo + ",amount:" + amount);
    util.request(api.AddMenuGoodsOrder, {
      userId: userId,
      appId: appid,
      token: token,
      timeStamp: TIME,
      sign: utilMd5.hexMD5(token + appid + TIME),
      products: '',
      // productNu:'',
      startAddress: startAddress,
      linkMan: linkMan,
      linkPhone: linkPhone,
      startlat: startlat,
      startlon: startlon,
      endAddress: endAddress,
      endLinkMan: linkMan,
      endLinkPhone: linkPhone,
      endlat: endlat,
      endlon: endlon,
      companyId: parentId,
      companyUserId: createUserId,
      dunWeight: dunWeight,
      goodsName: goodsName,
      goodsHostName: goodsHostName,
      // carTypeIds
      // useCarType
      // requestList
      orderType: '2',
      amount: amount,
      time: choseTime,
      piece: piece,
      distance: distance,
      emergencyState: emergencyState,
      memo: memo,
      requestList: memo,
      carTypeIds: statusType,
    }).then(function (res) {
      if (res.resultCode == 1) {
        //提示上传成功!s
        wx.showModal({
          title: '提示:',
          content: '下单成功！返回上一页面',
          success: function (e) {
            if (e.confirm) {
              //清楚缓存
              wx.redirectTo({
                url: '../home/home',
              })
            } else {

            }
          }
        })
      } else {
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