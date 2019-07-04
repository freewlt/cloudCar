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
    tabTitleList:['全部订单','配送中','已派送','已接单','待支付','已撤销'],
    orderstate:'',
    deliveryInfo:[
      {id:'1',time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',dispatcher:'整车/拼车',starAddress:'北京市朝阳区建国路世通国际大厦E座',endAddress:'北京市昌平区首开智慧社1号楼3单元',handle:'配车中',path:'../orderReceive/orderReceive'},
      {id:'13',time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',dispatcher:'整车/拼车',starAddress:'北京市朝阳区建国路世通国际大厦E座',endAddress:'北京市昌平区首开智慧社1号楼3单元',handle:'已派车',path:'../orderReceive/orderReceive'},
      {id:'41',time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',dispatcher:'整车/拼车',starAddress:'北京市朝阳区建国路世通国际大厦E座',endAddress:'北京市昌平区首开智慧社1号楼3单元',handle:'已接单',path:'../orderReceive/orderReceive'},
      {id:'156',time:'2019-5-24 17:36:35 ',orderNo:'234647558678786',dispatcher:'整车/拼车',starAddress:'北京市朝阳区建国路世通国际大厦E座',endAddress:'北京市昌平区首开智慧社1号楼3单元',handle:'待支付',path:'../orderReceive/orderReceive'},
    ]
   },
  onLoad: function (){
    
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
  findMess:function(){
    var _this = this;
    var TIME = util.formatTime(new Date());
    var userDetail = wx.getStorageSync('userDetail');
    var appid=app.globalData.appid;
    var appid ='wx0b5fd5d4d5f1dd68';
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
      orderstate:'',
      goodsOrderId:'',
      goodsOrderId:'',
      timeStamp:TIME,
      sign:utilMd5.hexMD5(token + appid + TIME),
    }).then(function (res) {
      console.log(res)
      if (res.resultCode == 1) {
        _this.setData({
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
  //查询
  handleBtn:function(e){
    var _this = this;
    // var id = _this.data.deliveryInfo[e.target.id].id
    console.log(e)
    const id = e.currentTarget.id;
     const data = _this.data.deliveryInfo.find((it) => it.id == id );
     if(data.handle=='已派车'){
      _this.setData({
        orderstate:8
      })
      _this.findMess()
     }
    // _this.findMess()
  },

  //点击切换，滑块index赋值
  checkCurrent:function(e){
    var _this = this;
    console.log(e)
    _this.setData({
      currentTab: e.currentTarget.id,
    })
    if(e.currentTarget.id == 1){
      _this.setData({
        orderstate:0
      })
    }
    if(e.currentTarget.id == 2){
      _this.setData({
        orderstate:8
      })
    }
    if(e.currentTarget.id == 3){
      _this.setData({
        orderstate:3
      })
    }
    if(e.currentTarget.id == 4){
      _this.setData({
        orderstate:1
      })
    }
    if(e.currentTarget.id == 5){
      _this.setData({
        orderstate:7
      })
    }
    // if (_this.data.currentTab === e.target.dataset.current){
    //     return false;
    // }else{
    //   _this.setData({
    //     currentTab: e.target.dataset.current
    //   })
    // }
  }

 })