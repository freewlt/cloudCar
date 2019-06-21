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
  methods: {
    backBtn:function(){
    var myEventDetail = {} // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})