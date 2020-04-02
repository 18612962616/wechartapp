const app = getApp()

Page({
  data: {
    details: '1.本产品适用于餐饮、娱乐或其他商业用途',
    referenceprice: '',
    benefit: '',
    category: '',
    contact: ''

  },
  onLoad: function (options) {
    var that = this;
    console.log(options.id);
    //接收id去后台查询详情，然后放页面，还没写！！！！！！！！！！！！！！！！！！！！！！！！！！
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    wx.request({
      url: app.globalData.URL + 'serviceAdded/selectByPrimaryKey',
      data: {
        "id": options.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          details: res.data.details,
          referenceprice: res.data.valueaddedservice.referenceprice,
          benefit: res.data.valueaddedservice.benefit,
          category: res.data.valueaddedservice.category,
          contact: res.data.valueaddedservice.contact
        })
      },
      error: function (res) {
        console.log(res);
      }
    })

  },
})