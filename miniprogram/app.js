//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //登录获取openid
    

    this.globalData = {
      'openid': '',
      // 'openid': 'oCnm45XGxKoMA6G9ffPZ727YmT90',
      // 'URL': 'https://www.ftcyl.com/ftwork/'
      'URL': 'http://localhost:8060/ftwork/'
    };
    
  },
  getOpenidOnlyCloud: async function() {
    return this.globalData.openid =this.globalData.openid || (await wx.cloud.callFunction({ name:'login' })).result.OPENID
  },
  getOpenid: async function () {
    (this.globalData.openid =this.globalData.openid || wx.getStorageSync('openid')) || wx.setStorageSync('openid',this.globalData.openid = (await wx.cloud.callFunction({ name:'login' })).result.OPENID);
    this.globalData.openid = (await wx.cloud.callFunction({ name:'login' })).result.OPENID
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     this.globalData.openid = res.result.openid
    //     return this.globalData.openid
    //   }
    // })
    console.log("===================================" + this.globalData.openid)
    // console.log("===================================" + res.result.openid)
    return this.globalData.openid
  }
  
})

