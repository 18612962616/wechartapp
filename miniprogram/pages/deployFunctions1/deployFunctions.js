// pages/deployFunctions/deployFunctions.js
import * as echarts from '../../ec-canvas/echarts';
// var wxCharts = require('../utils/wxcharts.js');
let chart = null;
// var app = getApp();
// var daylineChart = null;
// var yuelineChart = null;

var dataList = [];
const app = getApp()
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '特性示例：渐变色 阴影 点击缩放',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          color: 'rgba(0,0,0,0.05)'
        },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: dataShadow,
        animation: false
      },
      {
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ]
          )
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ]
            )
          }
        },
        data: data
      }
    ]
  };


  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateList: [],
    exposureList: [],
    clickList: [],
    pageviews: '0',
    click: '0',
    exposuretimes: '0',
    interestnumberStr: '0',
    interestnumberStrComp: '+0',
    pageviewsStr: '0',
    pageviewsStrComp: '+0',
    collectionnumberStr: '0',
    collectionnumberStrComp: '+0',
    pageFlag: '',
    date: '',
    ec: {
      lazyLoad: true // 延迟加载
    },
    ec1: {
      lazyLoad: true, // 延迟加载
      onInit: initChart

    },
    operationData: []
  },
  getOption: function () {

    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['点击数', '曝光数']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      // toolbox: {
      //     feature: {
      //         saveAsImage: {}
      //     }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataList.dateList
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '点击数',
          type: 'line',
          smooth: true,
          data: dataList.clickList
        },
        {
          name: '曝光数',
          type: 'line',
          smooth: true,
          data: dataList.exposureList
        }
      ]
    };
    return option;
  },
  getStatus(e){
    this.setData({ pageFlag: "aasss"})
  },
  getOption1: function () {

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '每周订单量'
    },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: dataList.dateList
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: dataList.OrderList,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }]
    };
    return option;
  },
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(Chart);
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
    this.echartsComponnet1.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption1());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getData: function () {
    console.log("HHHHHHHHHHHHHHHHH:" + app.globalData.openid)
    var that = this;
    wx.request({
      url: app.globalData.URL + 'shop/getEchartsData',
      data: {
        // "openid": 'oCnm45XGxKoMA6G9ffPZ727YmT90'
        "openid": app.globalData.openid
      },
      success: function (res) {
        console.log(res.data)
        dataList = res.data;
        that.init_echarts();
        that.setData({
          pageviews: res.data.pageviews,
          click: res.data.click,
          exposuretimes: res.data.exposuretimes,
          interestnumberStr: res.data.interestnumberStr,
          interestnumberStrComp: res.data.interestnumberStrComp,
          pageviewsStr: res.data.pageviewsStr,
          pageviewsStrComp: res.data.pageviewsStrComp,
          collectionnumberStr: res.data.collectionnumberStr,
          collectionnumberStrComp: res.data.collectionnumberStrComp
        })
      },
      error: function (res) {
        console.log(res);
      }
    });
    wx.request({
      url: app.globalData.URL + 'shop/getOperData',
      data: {
        // "openid": 'oCnm45XGxKoMA6G9ffPZ727YmT90'
        "openid": app.globalData.openid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          operationData: res.data.res
        })
      },
      error: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.echartsComponnet = this.selectComponent('#mychart');
    this.echartsComponnet1 = this.selectComponent('#mychart1');

    this.getDate();
    // console.log(app.getOpenid())
    // this.openid = app.getOpenid();
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     // if (res.authSetting['scope.userInfo']) {
    //     // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //     wx.cloud.callFunction({
    //       name: 'login',
    //       data: {},
    //       success: res => {
    //         console.log('[云函数] [login] user openid: ', res.result.openid)
    //         this.setData({
    //           openid: res.result.openid
    //         })
    //         this.data.openid = app.globalData.openid

    //         // app.globalData.openid = res.result.openid
    //         var that = this
    //         //将该用户历史填写商户信息回显
    //         //oCnm45XGxKoMA6G9ffPZ727YmT90
    //         this.echartsComponnet = this.selectComponent('#mychart');
    //         this.echartsComponnet1 = this.selectComponent('#mychart1');
    //         this.getData(); //获取数据
    //       },
    //       fail: err => {
    //         console.error('[云函数] [login] 调用失败', err)
    //       }
    //     })
    //     // }
    //   }
    // })
  },
  //获取时间戳
  getDate: function () {
    var date = new Date();
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    console.log(Y + M + D + h + m + s)
    var tem = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
    this.setData({
      date: tem,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}
)
