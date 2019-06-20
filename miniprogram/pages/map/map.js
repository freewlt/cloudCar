// pages/map/map.js
const app = getApp();
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  data: {
    title:'同城整车', 
    markers: [{
      iconPath: "../../images/startBig.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    detail:{
      name:'专车',
      price:"30",
      time:'2019-05-22 16:20:20'
    }
   },

  onLoad: function (options){
   },
  regionchange(e) {
    console.log('0',e.type)
  },
  markertap(e) {
    console.log('1',e.markerId)
  },
  controltap(e) {
    console.log('2',e.controlId)
  }
 })

