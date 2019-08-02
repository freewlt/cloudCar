// pages/sysMes/sysMes.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';
import utilMd5 from '../../utils/md5.js';

Page({
  data: {
    title:'订单记录',
    currentTab: 0,
    index: 0, 
    tabTitleList:['全部订单','配车中','已派车','进行中','已完成','已撤销'],
    deliveryInfo:[]
   },
  onLoad: function (){
    this.fetchData()
   },
  //  日期转换
   todate:function(inputstr, showsplit, showweek) {
        inputstr = inputstr + ""; //末尾加一个空格
        var date = "";
        var month = new Array();
        month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6; 
        month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
        var str = inputstr.split(" ");
        var strNew = str[1].replace(/,/g,'');
        date = str[2];
        date += showsplit + month[str[0]] + showsplit +strNew + ' '+ str[3] + ' ' + str[4];
        return date;
    },
  //返回按钮
  onMyEvent: function(e){
    let pages = getCurrentPages();
   // 获取上一级页面，即pageA的page对象
   let prevPage = pages[pages.length - 2];
   let prevPageData = prevPage.data;
   prevPage.onLoad();
   wx.navigateBack({
     delta: 1
   })
  },
  //获取当前滑块的index
   bindchange:function(e){
    const that  = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  //获取数据
  fetchData:function(){
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail');
    var appid=app.globalData.appid;
    var userId=userDetail.id;
    var token=userDetail.token;
    var orderstate = _this.data.orderstate;
    this.setData({
      time: TIME,
    });
    util.request(api.getMemberGoodsOrdersLogs,{
      userId:userId,
      appId:appid,
      token:token,
      orderstate:orderstate,
      goodsOrderId:'',
      pageIndex:0,
      pageSize:16,
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
    }).then(function (res) {
      if (res.resultCode == 1) {
      // 数组过滤
      let deliveryNew = res.list.map(item => {
        var adtime = item.addTime;
        if(item.orState == ''){
          _this.setData({
            orderState:'全部'
          })
        }
        if(item.orState == 0){
          _this.setData({
            orderState:'配车中'
          })
        }
        if(item.orState == 8){
          _this.setData({
            orderState:'已派车'
          })
        }
        if(item.orState == 1){
          _this.setData({
            orderState:'已接单'
          })
        }
        if(item.orState == 3){
          _this.setData({
            orderState:'运输中'
          })
        }
        if(item.orState == 2){
          _this.setData({
            orderState:'已完成'
          })
        }
        if(item.orState == 4){
          _this.setData({
            orderState:'已签收'
          })
        }
        if(item.orState == 7){
          _this.setData({
            orderState:'撤销'
          })
        }
        return {
            ...item,
            addTime: _this.todate(adtime, "-"),
            orState: _this.data.orderState
        }
      })
      _this.setData({
        deliveryInfo:deliveryNew
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

    // 下拉刷新
    onPullDownRefresh: function () {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      var _this = this;
      var TIME = util.formatTime(new Date());
      var userDetail = wx.getStorageSync('userDetail');
      var appid=app.globalData.appid;
      var userId=userDetail.id;
      var token=userDetail.token;
      var orderstate = _this.data.orderstate;
      this.setData({
        time: TIME,
      });
      util.request(api.getMemberGoodsOrdersLogs,{
        userId:userId,
        appId:appid,
        token:token,
        orderstate:orderstate,
        goodsOrderId:'',
        pageIndex:0,
        pageSize:16,
        timeStamp:TIME,
        sign:utilMd5.hexMD5(token + appid + TIME),
      }).then(function (res) {
        if (res.resultCode == 1) {
         // 数组过滤
      let deliveryNew = res.list.map(item => {
        var adtime = item.addTime;
        if(item.orState == ''){
          _this.setData({
            orderState:'全部'
          })
        }
        if(item.orState == 0){
          _this.setData({
            orderState:'配车中'
          })
        }
        if(item.orState == 8){
          _this.setData({
            orderState:'已派车'
          })
        }
        if(item.orState == 1){
          _this.setData({
            orderState:'已接单'
          })
        }
        if(item.orState == 3){
          _this.setData({
            orderState:'运输中'
          })
        }
        if(item.orState == 2){
          _this.setData({
            orderState:'已完成'
          })
        }
        if(item.orState == 4){
          _this.setData({
            orderState:'已签收'
          })
        }
        if(item.orState == 7){
          _this.setData({
            orderState:'撤销'
          })
        }
        return {
            ...item,
            addTime: _this.todate(adtime, "-"),
            orState: _this.data.orderState
        }
      })
      _this.setData({
        deliveryInfo:deliveryNew
      })
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      var that = this;
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
      // 页数+1
      var _this = this;
      var page = 1;
      page = page + 1;
      var TIME = util.formatTime(new Date());
      var userDetail = wx.getStorageSync('userDetail');
      var appid=app.globalData.appid;
      var userId=userDetail.id;
      var token=userDetail.token;
      var orderstate = _this.data.orderstate;
      this.setData({
        time: TIME,
      });
      util.request(api.getMemberGoodsOrdersLogs+'?page=' + page,{
        userId:userId,
        appId:appid,
        token:token,
        orderstate:orderstate,
        goodsOrderId:'',
        pageIndex:0,
        pageSize:16,
        timeStamp:TIME,
        sign:utilMd5.hexMD5(token + appid + TIME),
      }).then(function (res) {
        if (res.resultCode == 1) {
          // 数组过滤
          let deliveryNew = res.list.map(item => {
            var adtime = item.addTime;
            if(item.orState == ''){
              _this.setData({
                orderState:'全部'
              })
            }
            if(item.orState == 0){
              _this.setData({
                orderState:'配车中'
              })
            }
            if(item.orState == 8){
              _this.setData({
                orderState:'已派车'
              })
            }
            if(item.orState == 1){
              _this.setData({
                orderState:'已接单'
              })
            }
            if(item.orState == 3){
              _this.setData({
                orderState:'运输中'
              })
            }
            if(item.orState == 2){
              _this.setData({
                orderState:'已完成'
              })
            }
            if(item.orState == 4){
              _this.setData({
                orderState:'已签收'
              })
            }
            if(item.orState == 7){
              _this.setData({
                orderState:'撤销'
              })
            }
            return {
                ...item,
                addTime: _this.todate(adtime, "-"),
                orState: _this.data.orderState
            }
          })
          const oldData = _this.data.deliveryInfo;
          _this.setData({
            deliveryInfo:oldData.concat(deliveryNew)
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

  //查询
  handleBtn:function(){
    var _this = this;
  },

  //点击切换，滑块index赋值
  checkCurrent:function(e){
    var _this = this;
    _this.setData({
      currentTab: e.currentTarget.id,
    })
    if(e.currentTarget.id == 1){
      _this.setData({
        orderstate:0
      })
      _this.fetchData();
    }
    if(e.currentTarget.id == 2){
      _this.setData({
        orderstate:8
      })
      _this.fetchData();
    }
    if(e.currentTarget.id == 3){
      _this.setData({
        orderstate:3
      })
      _this.fetchData();
    }
    if(e.currentTarget.id == 4){
      _this.setData({
        orderstate:1
      })
      _this.fetchData();
    }
    if(e.currentTarget.id == 5){
      _this.setData({
        orderstate:7
      })
      _this.fetchData();
    }
  }

 })