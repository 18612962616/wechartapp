//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    openid: "",
    logged: false,
    takeSession: false,
    //控制诊断结果，根据是否开通商户通和优惠促销判断到底显示哪个诊断结果模板页
    ifresult1:false,
    ifresult2: false,
    ifresult3: false,
    //控制当前人是否填写过商铺信息，未填写过为isform为true，显示表单页，填写过为ifresult为false，显示诊断结果页
    ifform: false,
    ifresult:false,
    requestResult: '',
    region: ['北京市', '北京市', '海淀区'],
    customItem: '全部',
    date: '2020-01-01',
    //会员优惠体系存储变量
    preferentialSelect: [],
    //控制优惠体系显示开关
    ifpreferential: false,
    ifpromotionMoney: false,
    ifcommunicationBudget: false,
    //三表单流程控制
    ifbaseForm: true,
    ifmerchantPassForm: false,
    ifpromotionForm: false,
    //记录复选框的最终选择值
    commentProductSelect: "",
    otherProductSelect: "",
    //诊断结果时存储结果
    diagnoseMerchantpass1: "",
    diagnoseMerchantpass2: "",
    diagnoseMerchantpass3: "",
    diagnoseMerchantpass4: "",
    diagnoseMerchantpass5: "",
    diagnoseMerchantpass6: "",
    diagnoseMerchantpass7: "",
    diagnoseMerchantpass8: "",
    diagnoseMerchantpass9: "",
    diagnoseMerchantpass10: "",
    diagnoseMerchantpass11: "",
    diagnosePromotion1: "",
    diagnosePromotion2: "",
    diagnosePromotion3: "",
    diagnosePromotion4: "",
    diagnosePromotion5: "",
    diagnosePromotion6: "",
    diagnosePromotion7: "",
    diagnosePromotion8: "",
    diagnosePromotion9: "",
    diagnosePromotion10: "",
    diagnosePromotion11: "",
    diagnosePromotion12: "",
    diagnosePromotion13: "",
    diagnosePromotion14: "",
    //店铺平米数数组
    scale: [
      '100平米以下',
      '100-200平米',
      '200-300平米',
      '300-500平米',
      '500平米以上'
    ],
    //店铺人均数组
    perCapita: [
      '100以下',
      '100-150',
      '150-200',
      '200-300',
      '300以上'
    ],
    //菜系数组
    style: [
      '小吃快餐',
      '烧烤烤串',
      '自助餐',
      '韩国料理',
      '粤菜',
      '其他美食',
      '云贵菜',
      '北京菜',
      '江河湖海虾',
      '小龙虾',
      '湘菜',
      '东北菜',
      '本帮江浙菜',
      '素食',
      '西北菜',
      '早茶',
      '家常菜',
      '水果生鲜',
      '粉面馆',
      '食品保健',
      '面包甜点',
      '饮品店',
      '火锅',
      '川菜',
      '西餐',
      '咖啡厅',
      '日本菜',
      '特色菜',
      '烤肉',
      '新疆菜',
      '徽菜',
      '私房菜',
      '鲁菜',
      '创意菜',
      '湖北菜',
      '东南亚菜',
      '福建菜',
      '台湾菜',
      '俄罗斯菜'
    ],
    //星级数组
    star: [
      '5星',
      '4.5星',
      '4星',
      '3.5星',
      '3星',
      '3星以下'
    ],
    //评论数组
    comment: [
      "100条以下",
      "100-300条",
      "300-800条",
      "800-1500条",
      "1500条以上",
    ],
    //店铺类型数组
    type: [
      "社区",
      "商圈",
      "CBD",
      "校园",
      "混合",
    ],
    //主要消费群体
    consumer: [
      "上班族",
      "居民",
      "学生",
      "复合型商场"
    ],
    //门店经营情况
    manage: [
      "新开业",
      "盈利",
      "亏损"
    ],
    //目前月流水
    account: [
      "100W以上",
      "70-100W",
      "50-70W以上",
      "30-50W以上",
      "30W以下"
    ],
    //会员规则数组
    rule: [
      "储值入会",
      "免费入会",
      "购买会员卡入会",
      "无会员体系"
    ],
    //会员优惠体系
    preferential: [{
        name: '消费累计积分抵现',
        value: '消费累计积分抵现'
      },
      {
        name: '享受会员折扣',
        value: '享受会员折扣'
      },
      {
        name: '享受会员菜品',
        value: '享受会员菜品'
      },
      {
        name: '消费返余额',
        value: '消费返余额'
      }
    ],
    //推广计划数组
    spread: [
      "有、店铺目前正在推广中",
      "不知道在哪些方面推广更合理、有效",
      "不想在这方面花费太多"
    ],
    //推广预算数组
    promotionMoney: [
      "5000以下",
      "5000-10000",
      "10000-15000",
      "15000-25000",
      "25000-35000",
      "35000以上"

    ],
    //是否开通商户通数组
    merchantPass: [
      "是，正在使用",
      "否、觉得没用",
      "之前用过没效果，到期后未开通",
      "没人维护不会使用"
    ],
    //是否开通点评产品数组
    commentProduct: [{
        name: '旺铺宝',
        value: '旺铺宝'
      },
      {
        name: '商户通',
        value: '商户通 '
      },
      {
        name: '霸王餐',
        value: '霸王餐'
      },
      {
        name: 'VIP特权',
        value: 'VIP特权'
      },
      {
        name: '品牌秀',
        value: '品牌秀'
      },
      {
        name: '推广通',
        value: '推广通'
      },
      {
        name: 'NCPM（高级推广通）',
        value: 'NCPM（高级推广通）'
      },
      {
        name: '电脑关键词',
        value: '电脑关键词'
      },
      {
        name: '手机关键词',
        value: '手机关键词'
      },
      {
        name: '达人探店',
        value: '达人探店'
      },
      {
        name: '其他',
        value: '其他'
      }
    ],
    //是否开通推广通数组
    communication: [
      "是，正在使用",
      "否、觉得没用",
      "之前用过觉得没效果",
      "没人维护不会使用"
    ],
    //推广通预算数组
    communicationBudget: [
      "300以下",
      "300-500",
      "500-800",
      "800-1500",
      "1500-2000",
      "2000以上"
    ],
    //其他站外流量产品数组
    otherProduct: [{
        name: '抖音官方蓝V',
        value: '抖音官方蓝V'
      },
      {
        name: '抖音达人探店',
        value: '抖音达人探店 '
      },
      {
        name: '本地知名公众号',
        value: '本地知名公众号'
      },
      {
        name: '官方公众号',
        value: '官方公众号'
      },
      {
        name: '小红书',
        value: '小红书'
      },
      {
        name: '微博',
        value: '微博'
      },
      {
        name: '联联周边游',
        value: '联联周边游'
      },
      {
        name: '爱抢购',
        value: '爱抢购'
      },
      {
        name: '如糖',
        value: '如糖'
      },
      {
        name: '达人探店',
        value: '达人探店'
      },
      {
        name: '其他',
        value: '其他'
      }
    ],
    //可以接受最大优惠数组
    discount: [
      "8-9折",
      "7-8折",
      "6-7折",
      "5-6折",
      "不接受打折、接受赠送菜品、优惠券",
      "不接受任何优惠"
    ],
    //当前急需解决问题数组
    problem: [
      "提高营业流水",
      "增加店内人气",
      "提升点评星级",
      "完善、优化大众点评页面",
      "提高店铺线上曝光",
      "其他请备注"
    ],
    //商户通数组1
    merchantPass1: [
      "每周更新",
      "每月更新",
      "配合店内有活动时更新",
      "很久没更新过"
    ],
    //商户通数组2
    merchantPass2: [
      "已上传20张店内环境、菜品照片",
      "上传后从未更新过",
      "不知道在哪上传"
    ],
    //商户通数组3
    merchantPass3: [
      "已上传页面显示",
      "店内未拍摄视频",
      "不知道在哪上传"
    ],
    //商户通数组4
    merchantPass4: [
      "已上传页面显示",
      "店内未拍摄视频",
      "不知道在哪上传"
    ],
    //商户通数组5
    merchantPass5: [
      "20个菜品图、配合菜品动图、视频",
      "已上传部分菜品照片",
      "不知道在哪上传"
    ],
    //商户通数组6
    merchantPass6: [
      "每周更新",
      "每月更新",
      "配合店内有活动时更新",
      "很久没更新过"
    ],
    //商户通数组7
    merchantPass7: [
      "已上传页面显示",
      "对品牌背景、发展不太了解",
      "不知道在哪上传"
    ],
    //商户通数组8
    merchantPass8: [
      "已开通预定功能",
      "认为此功能没用",
      "不知道在哪开通"
    ],
    //商户通数组9
    merchantPass9: [
      "已开通排队功能",
      "认为此功能没用",
      "不知道在哪开通"
    ],
    //商户通数组10
    merchantPass10: [
      "已开通",
      "认为此功能没用",
      "不知道在哪开通"
    ],
    //商户通数组11
    merchantPass11: [
      "每天回复",
      "每周回复",
      "只回复差评",
      "从不回复"
    ],
    //优惠促销数组1
    promotion1: [
      "有活动时发布",
      "觉得该功能没用",
      "不知道在哪发布"
    ],
    //优惠促销数组2
    promotion2: [
      "已发布",
      "店内不设置任何优惠",
      "从未使用过"
    ],
    //优惠促销数组3
    promotion3: [
      "已发布",
      "店内不设置任何优惠",
      "销量不好已下线",
      "从未发布过"
    ],
    //优惠促销数组4
    promotion4: [
      "已发布",
      "店内不设置任何优惠",
      "销量不好已下线",
      "从未发布过"
    ],
    //优惠促销数组5
    promotion5: [
      "已发布",
      "店内不设置任何优惠",
      "销量不好已下线",
      "从未发布过"
    ],
    //优惠促销数组6
    promotion6: [
      "已发布",
      "店内不设置任何优惠",
      "销量不好已下线",
      "从未发布过"
    ],
    //优惠促销数组7
    promotion7: [
      "已发布",
      "店内不设置任何优惠",
      "销量不好已下线",
      "从未发布过"
    ],
    //优惠促销数组8
    promotion8: [
      "已发布",
      "店内不设置任何优惠",
      "销量不好已下线",
      "不清楚规则，从未发布过"
    ],
    //优惠促销数组9
    promotion9: [
      "已发布",
      "折扣太低，店内接受不了",
      "销量不好已下线",
      "不清楚规则，从未发布过"
    ],
    //优惠促销数组10
    promotion10: [
      "已发布",
      "折扣太低，店内接受不了",
      "销量不好已下线",
      "不清楚规则，从未发布过"
    ],
    //优惠促销数组11
    promotion11: [
      "已发布",
      "折扣太低，店内接受不了",
      "销量不好已下线",
      "不清楚规则，从未发布过"
    ],
    //优惠促销数组12
    promotion12: [
      "已发布",
      "效果不明显、已下线",
      "不清楚规则，从未发布过"
    ],
    //优惠促销数组13
    promotion13: [
      "发布过1期以上，效果明显",
      "发布过1期、没效果不准备再使用",
      "不清楚规则、从未发布过"
    ],
    //优惠促销数组14
    promotion14: [
      "发布过1期以上，效果明显",
      "发布过1期、没效果不准备再使用",
      "不清楚规则、从未发布过"
    ]
  },

  //地区选择事件
  bindShopRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //日期选择事件
  bindOpenDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //店铺平米数选择事件
  bindScaleChange: function(e) {
    this.setData({
      index1: e.detail.value
    })
  },
  //实际人均选择事件
  bindPerCapitaChange: function(e) {
    this.setData({
      index2: e.detail.value
    })
  },

  //菜系选择事件
  bindStyleChange: function(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  //星级选择事件
  bindStarChange: function(e) {
    this.setData({
      index4: e.detail.value
    })
  },
  //评论数选择事件
  bindCommentChange: function(e) {

    this.setData({
      index5: e.detail.value
    })
  },
  //店铺类型选择事件
  bindTypeChange: function(e) {
    this.setData({
      index6: e.detail.value
    })
  },
  //消费群体选择事件
  bindConsumerChange: function(e) {
    this.setData({
      index7: e.detail.value
    })
  },
  //经营情况选择事件
  bindManageChange: function(e) {

    this.setData({
      index8: e.detail.value
    })
  },
  //目前店内月流水选择事件
  bindAccountChange: function(e) {

    this.setData({
      index9: e.detail.value
    })
  },
  //会员规则选择事件
  bindRuleChange: function(e) {
    if (e.detail.value != 3) { //有会员体系
      this.setData({
        ifpreferential: true
      })
    } else { //无会员体系
      this.setData({
        ifpreferential: false
      })
    }
    this.setData({
      index10: e.detail.value
    })
  },
  //会员优惠规则选择事件
  checkboxPreferentialChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      preferentialSelect: e.detail.value
    })
  },
  //推广有无预算选择事件
  bindSpreadChange: function(e) {
    if (e.detail.value != 0) { //无预算
      this.setData({
        ifpromotionMoney: false
      })
    } else { //有预算
      this.setData({
        ifpromotionMoney: true
      })
    }
    this.setData({
      index11: e.detail.value
    })
  },
  //推广预算选择事件
  bindPromotionMoneyChange: function(e) {

    this.setData({
      index12: e.detail.value
    })
  },
  //商户通选择事件
  bindMerchantPassChange: function(e) {

    this.setData({
      index13: e.detail.value
    })
  },
  //是否购买点评产品选择事件
  checkboxCommentProductChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    //js存储变量赋值
    this.data.commentProductSelect = e.detail.value
    this.setData({
      commentProductSelect: e.detail.value
    })
  },
  //是否开通推广通选择事件
  bindCommunicationChange: function(e) {

    if (e.detail.value != 0) { //未预算
      this.setData({
        ifcommunicationBudget: false
      })
    } else { //有预算
      this.setData({
        ifcommunicationBudget: true
      })
    }
    this.setData({
      index14: e.detail.value
    })
  },
  //推广通预算选择事件
  bindCommunicationBudgetChange: function(e) {

    this.setData({
      index15: e.detail.value
    })
  },
  //是否购买站外流量产品选择事件
  checkboxOtherProductChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      otherProductSelect: e.detail.value
    })
  },
  //最大优惠选择事件
  bindDiscountChange: function(e) {

    this.setData({
      index16: e.detail.value
    })
  },
  //当前急需解决问题选择事件
  bindProblemChange: function(e) {

    this.setData({
      index17: e.detail.value
    })
  },
  //商户通选择事件1
  bindMerchantPass1Change: function(e) {
    this.setData({
      index21: e.detail.value
    })
  },
  //商户通选择事件2
  bindMerchantPass2Change: function(e) {
    this.setData({
      index22: e.detail.value
    })
  },
  //商户通选择事件3
  bindMerchantPass3Change: function(e) {
    this.setData({
      index23: e.detail.value
    })
  },
  //商户通选择事件4
  bindMerchantPass4Change: function(e) {
    this.setData({
      index24: e.detail.value
    })
  },
  //商户通选择事件5
  bindMerchantPass5Change: function(e) {
    this.setData({
      index25: e.detail.value
    })
  },
  //商户通选择事件6
  bindMerchantPass6Change: function(e) {
    this.setData({
      index26: e.detail.value
    })
  },
  //商户通选择事件7
  bindMerchantPass7Change: function(e) {
    this.setData({
      index27: e.detail.value
    })
  },
  //商户通选择事件8
  bindMerchantPass8Change: function(e) {
    this.setData({
      index28: e.detail.value
    })
  },
  //商户通选择事件9
  bindMerchantPass9Change: function(e) {
    this.setData({
      index29: e.detail.value
    })
  },
  //商户通选择事件10
  bindMerchantPass10Change: function(e) {
    this.setData({
      index30: e.detail.value
    })
  },
  //商户通选择事件11
  bindMerchantPass11Change: function(e) {
    this.setData({
      index31: e.detail.value
    })
  },
  //惠促销选择事件1
  bindPromotion1Change: function(e) {
    this.setData({
      index41: e.detail.value
    })
  },
  //惠促销选择事件2
  bindPromotion2Change: function(e) {
    this.setData({
      index42: e.detail.value
    })
  },
  //惠促销选择事件3
  bindPromotion3Change: function(e) {
    this.setData({
      index43: e.detail.value
    })
  },
  //惠促销选择事件4
  bindPromotion4Change: function(e) {
    this.setData({
      index44: e.detail.value
    })
  },
  //惠促销选择事件5
  bindPromotion5Change: function(e) {
    this.setData({
      index45: e.detail.value
    })
  },
  //惠促销选择事件6
  bindPromotion6Change: function(e) {
    this.setData({
      index46: e.detail.value
    })
  },
  //惠促销选择事件7
  bindPromotion7Change: function(e) {
    this.setData({
      index47: e.detail.value
    })
  },
  //惠促销选择事件8
  bindPromotion8Change: function(e) {
    this.setData({
      index48: e.detail.value
    })
  },
  //惠促销选择事件9
  bindPromotion9Change: function(e) {
    this.setData({
      index49: e.detail.value
    })
  },
  //惠促销选择事件10
  bindPromotion10Change: function(e) {
    this.setData({
      index50: e.detail.value
    })
  },
  //惠促销选择事件11
  bindPromotion11Change: function(e) {
    this.setData({
      index51: e.detail.value
    })
  },
  //惠促销选择事件12
  bindPromotion12Change: function(e) {
    this.setData({
      index52: e.detail.value
    })
  },
  //惠促销选择事件13
  bindPromotion13Change: function(e) {
    this.setData({
      index53: e.detail.value
    })
  },
  //惠促销选择事件14
  bindPromotion14Change: function(e) {
    this.setData({
      index54: e.detail.value
    })
  },
  //表单提交事件
  baseFormSubmit: function(e) {
    console.log('baseForm发生了submit事件，提交数据：', e.detail.value)
    let index = e.detail.target.dataset.index;
    if (index == "1") { //处于基础表单
      if (e.detail.value.merchantpass == "是，正在使用") { //开通了商户通，进入下一步

        this.setData({
          ifbaseForm: false,
          ifmerchantPassForm: true,
          ifpromotionForm: false,
        })
        this.goTop()
      } else { //未开通商户通
        if (this.data.commentProductSelect.indexOf("旺铺宝") >= 0) { //未开通商户通但开通了旺铺宝
          this.setData({
            ifbaseForm: false,
            ifmerchantPassForm: false,
            ifpromotionForm: true,
          })
          this.goTop()
        } else { //未开通商户通也未开通旺铺宝，直接提交
          this.baseFormSubmitToServer(e.detail.value)
          this.setData({
            ifbaseForm: false,
            ifmerchantPassForm: true,
            ifpromotionForm: false,
          })
          this.setData({
            ifbaseForm: true,
            ifmerchantPassForm: false,
            ifpromotionForm: false,
          })
        }
      }
    } else if (index == "2") { //处于商户通表单,只要开通商户通，也要填写优惠促销
        this.setData({
          ifbaseForm: false,
          ifmerchantPassForm: false,
          ifpromotionForm: true,
        })
        this.goTop()

    } else { //优惠促销完成填写并最终提交
      this.baseFormSubmitToServer(e.detail.value)
    }
  },
  baseFormSubmitToServer: function(form) {
    this.goTop()
    //将当前数据转换为诊断结果
    console.log(form)
    this.diagnose(form)
    //根据填写情况判断跳转页
    this.toResult()
    let that=this
    //部分表单数据赋值处理
    console.log("form", this.data.form_data)
    wx.request({
      url: 'https://suzhan.qicp.vip/ftwork/shop/insertShop',
      data: {
        "ftShopbase": JSON.stringify(form)

      },
      success: function(res) {

      },
      error: function(res) {
        console.log(res);
      }

    })
  },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              console.log('[云函数] [login] user openid: ', res.result.openid)
              this.setData({
                openid: res.result.openid
              })
              this.data.openid = res.result.openid

              app.globalData.openid = res.result.openid
              var that = this
              //将该用户历史填写商户信息回显
              wx.request({
                url: 'https://suzhan.qicp.vip/ftwork/shop/getShop',
                data: {
                  "openid": this.data.openid

                },
                success: function(res) {
                  console.log(res.data)
                  if (res.data != "") {
                    //如果填写过店铺信息，直接显示诊断结果页
                    //处理转换诊断结果
                    that.diagnose(res.data)
                    //根据填写情况判断进入哪个诊断页面
                    that.toResult()

                  }else{
                    that.setData({
                      //未填写过店铺信息，显示基础表单页
                      ifform: true,
                      ifesult: false,
                    })
                  }
                },
                error: function(res) {
                  console.log(res);
                }

              })
            },
            fail: err => {
              console.error('[云函数] [login] 调用失败', err)
            }
          })
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })


  },
  //根据店铺填写情况判断跳转目标结果页
  toResult(){
    console.log("sad",this.data.merchantPass1,"asd",this.data.promotion1)
    if (this.data.diagnoseMerchantpass1!=""){//开通了商户通，则显示全部诊断结果
      console.log("1")
      this.setData({
        ifform: false,
        ifresult:true,
        ifresult1:true
      });
    }else{//未开通商户通
      if (this.data.diagnosePromotion1!=""){//未开通商户通，但开通了旺铺宝，则显示优惠促销结果页
        console.log("2")
        this.setData({
          ifform: false,
          ifresult: true,
          ifresult2: true
        });
      }else{//商户通和旺铺宝均未开通，则显示第三结果页
      console.log("3")
        this.setData({
          ifform: false,
          ifresult: true,
          ifresult3: true
        });
      }

    }
  },
  //将填写的店铺信息转换为诊断结果并赋值
  diagnose(data) {
    switch (data.merchantpass1) {
      case "每周更新":
        this.setData({
          diagnoseMerchantpass1: "对比更新后浏览量转化率"
        });
        break;
      case "每月更新":
        this.setData({
          diagnoseMerchantpass1: "对比更新后浏览量转化率"
        });
        break;
      case "配合店内有活动时更新":
        this.setData({
          diagnoseMerchantpass1: "对比更新后浏览量转化率"
        });
        break;
      case "很久没更新过":
        this.setData({
          diagnoseMerchantpass1: "尽快更新五连图"
        });
        break;
    }
    switch (data.merchantpass2) {
      case "已上传20张店内环境、菜品照片":
        this.setData({
          diagnoseMerchantpass2: "继续保持"
        });
        break;
      case "上传后从未更新过":
        this.setData({
          diagnoseMerchantpass2: "更新店内最新环境、菜品照片"
        });
        break;
      case "不知道在哪上传":
        this.setData({
          diagnoseMerchantpass2: "更新店内最新环境、菜品照片"
        });
        break;
    }
    switch (data.merchantpass3) {
      case "已上传页面显示":
        this.setData({
          diagnoseMerchantpass3: "继续保持"
        });
        break;
      case "店内未拍摄视频":
        this.setData({
          diagnoseMerchantpass3: "尽快上传突出品牌、环境、菜品的视频"
        });
        break;
      case "不知道在哪上传":
        this.setData({
          diagnoseMerchantpass3: "尽快上传突出品牌、环境、菜品的视频"
        });
        break;
    }
    switch (data.merchantpass4) {
      case "已上传页面显示":
        this.setData({
          diagnoseMerchantpass4: "继续保持"
        });
        break;
      case "店内未拍摄视频":
        this.setData({
          diagnoseMerchantpass4: "尽快上传突出品牌、环境、菜品的视频"
        });
        break;
      case "不知道在哪上传":
        this.setData({
          diagnoseMerchantpass4: "尽快上传突出品牌、环境、菜品的视频"
        });
        break;
    }
    switch (data.merchantpass5) {
      case "20个菜品图、配合菜品动图、视频":
        this.setData({
          diagnoseMerchantpass5: "继续保持"
        });
        break;
      case "已上传部分菜品照片":
        this.setData({
          diagnoseMerchantpass5: "更新20个商家招牌菜品配合动图、视频效果更佳"
        });
        break;
      case "不知道在哪上传":
        this.setData({
          diagnoseMerchantpass5: "更新20个商家招牌菜品配合动图、视频效果更佳"
        });
        break;
    }
    switch (data.merchantpass6) {
      case "每周更新":
        this.setData({
          diagnoseMerchantpass6: "继续保持"
        });
        break;
      case "每月更新":
        this.setData({
          diagnoseMerchantpass6: "每月更新2-3次可配合活动"
        });
        break;
      case "配合店内有活动时更新":
        this.setData({
          diagnoseMerchantpass6: "继续保持"
        });
        break;
      case "很久没有更新过":
        this.setData({
          diagnoseMerchantpass6: "尽快更新商家新鲜事"
        });
        break;
    }
    switch (data.merchantpass7) {
      case "已上传页面显示":
        this.setData({
          diagnoseMerchantpass7: "继续保持"
        });
        break;
      case "对品牌背景、发展不太了解":
        this.setData({
          diagnoseMerchantpass7: "尽快更新品牌故事"
        });
        break;
      case "不知道在哪上传":
        this.setData({
          diagnoseMerchantpass7: "尽快更新品牌故事"
        });
        break;
    }
    switch (data.merchantpass8) {
      case "已开通预定功能":
        this.setData({
          diagnoseMerchantpass8: "继续保持"
        });
        break;
      case "认为此功能没用":
        this.setData({
          diagnoseMerchantpass8: "尽快开通预定功能"
        });
        break;
      case "不知道在哪开通":
        this.setData({
          diagnoseMerchantpass8: "尽快开通预定功能"
        });
        break;
    }
    switch (data.merchantpass9) {
      case "已开通排队功能":
        this.setData({
          diagnoseMerchantpass9: "继续保持"
        });
        break;
      case "认为此功能没用":
        this.setData({
          diagnoseMerchantpass9: "尽快开通排队功能"
        });
        break;
      case "不知道在哪开通":
        this.setData({
          diagnoseMerchantpass9: "尽快开通排队功能"
        });
        break;
    }
    switch (data.merchantpass10) {
      case "已开通":
        this.setData({
          diagnoseMerchantpass10: "继续保持"
        });
        break;
      case "认为此功能没用":
        this.setData({
          diagnoseMerchantpass10: "尽快开通达人探店"
        });
        break;
      case "不知道在哪开通":
        this.setData({
          diagnoseMerchantpass10: "尽快开通达人探店"
        });
        break;
    }
    switch (data.merchantpass11) {
      case "每天回复":
        this.setData({
          diagnoseMerchantpass11: "继续保持"
        });
        break;
      case "每周回复":
        this.setData({
          diagnoseMerchantpass11: "建议3天内回复效果最佳"
        });
        break;
      case "只回复差评":
        this.setData({
          diagnoseMerchantpass11: "回复所有有效评价"
        });
        break;
      case "从不回复":
        this.setData({
          diagnoseMerchantpass11: "尽快回复消费者评论"
        });
        break;
    }
    switch (data.promotion1) {
      case "有活动时发布":
        this.setData({
          diagnosePromotion1: "继续保持"
        });
        break;
      case "觉得该功能没用":
        this.setData({
          diagnosePromotion1: "尽快使用该功能"
        });
        break;
      case "不知道在哪发布":
        this.setData({
          diagnosePromotion1: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion2) {
      case "已发布":
        this.setData({
          diagnosePromotion2: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion2: "尽快使用该功能"
        });
        break;
      case "从未使用过":
        this.setData({
          diagnosePromotion2: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion3) {
      case "已发布":
        this.setData({
          diagnosePromotion3: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion3: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion3: "调整套餐产品或折扣，使用该功能"
        });
        break;
    }
    switch (data.promotion4) {
      case "已发布":
        this.setData({
          diagnosePromotion4: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion4: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion4: "调整套餐产品或折扣，使用该功能"
        });
        break;
    }
    switch (data.promotion5) {
      case "已发布":
        this.setData({
          diagnosePromotion5: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion5: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion5: "调整套餐产品或折扣，使用该功能"
        });
        break;
    }
    switch (data.promotion6) {
      case "已发布":
        this.setData({
          diagnosePromotion6: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion6: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion6: "调整套餐产品或折扣，使用该功能"
        });
        break;
      case "从未发布过":
        this.setData({
          diagnosePromotion6: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion7) {
      case "已发布":
        this.setData({
          diagnosePromotion7: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion7: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion7: "调整套餐产品或折扣，使用该功能"
        });
        break;
      case "从未发布过":
        this.setData({
          diagnosePromotion7: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion8) {
      case "已发布":
        this.setData({
          diagnosePromotion8: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion8: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion8: "调整套餐产品或折扣，使用该功能"
        });
        break;
      case "从未发布过":
        this.setData({
          diagnosePromotion8: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion9) {
      case "已发布":
        this.setData({
          diagnosePromotion9: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion9: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion9: "调整提报产品，使用该功能"
        });
        break;
      case "不清楚规则，从未发布过":
        this.setData({
          diagnosePromotion9: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion10) {
      case "已发布":
        this.setData({
          diagnosePromotion10: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion10: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion10: "调整提报产品，使用该功能"
        });
        break;
      case "不清楚规则，从未发布过":
        this.setData({
          diagnosePromotion10: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion11) {
      case "已发布":
        this.setData({
          diagnosePromotion11: "继续保持"
        });
        break;
      case "店内不设置任何优惠":
        this.setData({
          diagnosePromotion11: "尽快使用该功能"
        });
        break;
      case "销量不好已下线":
        this.setData({
          diagnosePromotion11: "调整提报产品，使用该功能"
        });
        break;
      case "不清楚规则，从未发布过":
        this.setData({
          diagnosePromotion11: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion12) {
      case "已发布":
        this.setData({
          diagnosePromotion12: "继续保持"
        });
        break;
      case "效果不明显、已下线":
        this.setData({
          diagnosePromotion12: "对比上线前后领取、复购率变化"
        });
        break;
      case "不清楚规则，从未发布过":
        this.setData({
          diagnosePromotion12: "尽快使用该功能"
        });
        break;
    }
    switch (data.promotion13) {
      case "发布过1期以上，效果明显":
        this.setData({
          diagnosePromotion13: "对比霸王餐前后浏览量、星级、评论数量变化"
        });
        break;
      case "发布过1期、觉得没效果不准备再使用":
        this.setData({
          diagnosePromotion13: "对比霸王餐前后浏览量、星级、评论数量变化"
        });
        break;
      case "不清楚规则、从未发布过":
        this.setData({
          diagnosePromotion13: "尽快提报一期"
        });
        break;
    }
    switch (data.promotion14) {
      case "发布过1期以上，效果明显":
        this.setData({
          diagnosePromotion14: "对比霸王餐前后浏览量、星级、评论数量变化"
        });
        break;
      case "发布过1期、觉得没效果不准备再使用":
        this.setData({
          diagnosePromotion14: "对比霸王餐前后浏览量、星级、评论数量变化"
        });
        break;
      case "不清楚规则、从未发布过":
        this.setData({
          diagnosePromotion14: "尽快提报一期"
        });
        break;
    }

  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        // avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.data.openid = res.result.openid
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  goTop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      // wx.showModal({
      //   title: '提示',
      //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      // })
    }
  },
  // 上传图片
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

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

})