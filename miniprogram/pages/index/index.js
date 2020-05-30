//index.js
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  toContent(e) {
    let id = e.currentTarget.dataset.id;
    //如何放id还没写！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    wx.navigateTo({
      url: 'content/content?id=' + id + '',
    })
  },
  onLoad: function () {
    //444444
    var that = this;
    // 查看是否授权
    this.getOpenid();
    //444444
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.cloud.callFunction({
    //         name: 'login',
    //         data: {},
    //         success: res => {
    //           console.log('[index云函数] [login] user openid: ', res.result.openid)
    //           app.globalData.openid = res.result.openid
    //         },
    //         fail: err => {
    //           console.error('[云函数] [login] 调用失败', err)
    //         }
    //       })
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      var that = this;
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                var user = res
                // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                // 根据自己的需求有其他操作再补充
                // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                wx.login({
                  success: res => {
                    // 获取到用户的 code 之后：res.code
                    console.log("用户的code:" + res.code);
                    var code = res.code;
                    // 可以传给后台，再经过解析获取用户的 openid
                    // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                    // wx.request({
                    //     // 自行补上自己的 APPID 和 SECRET
                    //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdb78a2cbf5ace274&secret=6fa30c5c616586d12f69db8a7a6fe10d&js_code=' + res.code + '&grant_type=authorization_code',
                    //     success: res => {
                    //         // 获取到用户的 openid
                    //         console.log("用户的openid:" + res.data.openid);
                    //         app.globalData.openid = res.data.openid
                    //     }
                    // });
                    console.log(app.globalData.URL)
                    console.log(code)
                    wx.request({
                      url: app.globalData.URL + "shop/getOpenid",
                      data: {
                        code: code,
                        encryptedData: user.encryptedData,
                        iv: user.iv
                      },
                      method: "Get",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                      success: function (res) {
                        console.log("登录返回的数据：");
                        console.log(res);
                        app.globalData.openid = res.data.userInfo.openId
                      },
                      fail: function (error) {
                        console.log(error);
                      }
                    });
                  }
                });
              }
            });
          } else {
            // 用户没有授权
            // 改变 isHide 的值，显示授权页面
            that.setData({
              isHide: true
            });
          }
        },
        fail: function(){
          wx.showToast({
            title: 'fail', // 标题
            icon: 'success',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        }
      });
      // wx.showToast({
      //   title: 'seu111111111111', // 标题
      //   icon: 'success',  // 图标类型，默认success
      //   duration: 1500  // 提示窗停留时间，默认1500ms
      // })
      //333
      var that = this;
      wx.login({
        success: res => {
          // wx.showToast({
          //   title: 'seu', // 标题
          //   icon: 'success',  // 图标类型，默认success
          //   duration: 1500  // 提示窗停留时间，默认1500ms
          // })
          var code = res.code;

          var user = res

          wx.request({
            url: app.globalData.URL + "shop/getOpenid",
            data: {
              code: code,
              encryptedData: "",
              iv: ""
            },
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function (result) {
              // wx.showToast({
              //   title: '12121', // 标题
              //   icon: 'success',  // 图标类型，默认success
              //   duration: 1500  // 提示窗停留时间，默认1500ms
              // })
            }
          });

        },
        fail: function(){
          wx.showToast({
            title: 'fail', // 标题
            icon: 'success',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        },
        complete: function(){
          // wx.showToast({
          //   title: 'complete', // 标题
          //   icon: 'success',  // 图标类型，默认success
          //   duration: 1500  // 提示窗停留时间，默认1500ms
          // })
        }
      });
      //333
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  getOpenid: function () {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var user = res
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  var code = res.code;
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  // wx.request({
                  //     // 自行补上自己的 APPID 和 SECRET
                  //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdb78a2cbf5ace274&secret=6fa30c5c616586d12f69db8a7a6fe10d&js_code=' + res.code + '&grant_type=authorization_code',
                  //     success: res => {
                  //         // 获取到用户的 openid
                  //         console.log("用户的openid:" + res.data.openid);
                  //         app.globalData.openid = res.data.openid
                  //     }
                  // });
                  console.log(app.globalData.URL)
                  console.log(code)
                  wx.request({
                    url: app.globalData.URL + "shop/getOpenid",
                    data: {
                      code: code,
                      encryptedData: user.encryptedData,
                      iv: user.iv
                    },
                    method: "Get",
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                    },
                    success: function (res) {
                      console.log("登录返回的数据：");
                      console.log(res);
                      app.globalData.openid = res.data.userInfo.openId
                    },
                    fail: function (error) {
                      console.log(error);
                    }
                  });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  }
})
