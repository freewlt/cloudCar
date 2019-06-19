// component/navbar.js
const app = getApp();



 Component({
  //B在这里接收与data类似可以直接在wxml上用
  properties: {
    title: {
      type: String,//类型
      value: 'default value'//默认值
    }
  },
  data: {
    backPic:'../../images/back.png',
    backTxt:'返回',
  },
  backBtn:function(){
    let pages = getCurrentPages();
   // 获取上一级页面，即pageA的page对象
   let prevPage = pages[pages.length - 2];
   let prevPageData = prevPage.data;
   prevPage.onLoad();
   wx.navigateBack({
     delta: 1
   })
  }
})