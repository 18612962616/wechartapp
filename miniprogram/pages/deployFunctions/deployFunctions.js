// pages/deployFunctions/deployFunctions.js
import * as echarts from '../../ec-canvas/echarts';
// var wxCharts = require('../utils/wxcharts.js');
let chart = null;
// var app = getApp();
// var daylineChart = null;
// var yuelineChart = null;

var dataList = [];
const app = getApp()
function initChart(canvas, width, height, dateLiist, clickList, exposureList) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['点击率', '曝光率']
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
      data: ttt.data.dateList
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '点击率',
        type: 'line',
        stack: '总量',
        data: this.data.clickList
      },
      {
        name: '曝光率',
        type: 'line',
        stack: '总量',
        data: this.data.exposureList
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
    ec: {
      lazyLoad: true // 延迟加载
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
        data: ['点击量', '曝光数']
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
          name: '点击率',
          type: 'line',
          data: dataList.clickList
        },
        {
          name: '曝光率',
          type: 'line',
          data: dataList.exposureList
        }
      ]
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
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getData: function () {
    var that = this;
    wx.request({
      url: app.globalData.URL + 'shop/getEchartsData',
      data: {
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
        })
      },
      error: function (res) {
        console.log(res);
      }
    });
    wx.request({
      url: app.globalData.URL + 'shop/getOperData',
      data: {
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
  onLoad: async function (options) {
    var app = await getApp()
    // console.log(app.getOpenid())
    this.openid = app.getOpenid();
    //oCnm45XGxKoMA6G9ffPZ727YmT90
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData(); //获取数据
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
