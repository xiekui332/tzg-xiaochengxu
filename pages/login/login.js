const app = getApp()

Page({
  data: {
    src: "../../images/logo.png",
    img:"../../images/rule_logo.png",
    imges:"../../images/relu_copy.png",
    sumbitShow:false, //是否提交
    show: false,//是否绑定成功
    inputShow: true,
    inputPhone: "",//手机号
    inputYan: "",//验证码
    // huozheng:"",
    ruleTip: {
      title:"活动规则",
      contentList: ['每天签到领到的积分，消耗不等量积分 可获得不同商品的抽奖机会。', '中奖者我们会通过客服电话与您联系，并在第一时间送出您的奖品。','活动解释权归淘租公所有。']
    },
  },
  //手机号的验证
  inputPhonee:function(e){
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/g;
    if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '请输入11位手机号',
        icon: "none",
      })
    }
  },
  inputPhone: function (e) {
    // wx.setStorage({
    //   key: "inputPhone",
    //   data: e.detail.value
    // })
    this.setData({
     inputPhone: e.detail.value
    })
  },
  // 当验证码失去焦点时验证
  inputYan: function (e) {
    var that = this
    console.log(this.data.inputPhone, this.data.inputYan)
    // var myreg = /^[1][3,4,5,7,8][0-9]{9}$/g;
    // if (!myreg.test(this.data.inputPhone)) {
    //   wx.showToast({
    //     title: '请输入11位手机号',
    //     icon: "none",
    //   })
    // }
    this.setData({
      inputYan: e.detail.value,
    })
    if (this.data.inputPhone.length == 0) {
      wx.showToast({
        title: '手机号或验证码错误！',
        icon: "none",
        duration: 2000
      })
    } else {
      // wx.request({
      //   url: 'https://api.taozugong.com/award/sms/verifyMobile',
      //   method: 'POST',
      //   data: {
      //     mobile: this.data.inputPhone,
      //     authCode: this.data.inputYan,
      //     openId: app.globalData.openId
      //   },
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   success: function (res) {
      //     console.log(res.data)
      //     if (res.data.code == 200) {
      //       that.setData({
      //         // show: !that.data.show,
      //         sumbitShow: !that.data.sumbiShow
      //       })
      //     }
      //   }
      // })
    }
    // console.log(e.detail.value)
    // var that = this;
    // var inputYan = e.detail.value
    // var huozheng = this.data.huozheng
    // that.setData({
    //   inputYan: inputYan,
    //   zhengTrue: false,
    // })
    // if (inputYan.length >= 4) {
    //   if (inputYan == huozheng) {
    //     that.setData({
    //       zhengTrue: true,
    //     })
    //   } else {
    //     wx.showModal({
    //       content: '输入验证码有误',
    //       showCancel: false,
    //       success: function (res) {
    //       }
    //     }) 
    //   }
    // }
  },
  //提交按钮的函数
  loginBtn: function () {
    var that = this
    if (this.data.inputPhone.length == 0) {
      wx.showToast({
        title: '手机号或验证码错误！',
        icon: "none",
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://api.taozugong.com/award/sms/verifyMobile',
        method: 'POST',
        data: {
          mobile: this.data.inputPhone,
          authCode: this.data.inputYan,
          openId: app.globalData.openId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 200) {
            this.loginDialog = this.selectComponent('#loginDialog')
            this.loginDialog.onShow()
          }
        }
      })
    }
  },
  loginSuccess() {
    wx.navigateTo({
      url: '/pages/lottery_list/lottery_list'
    })
  }
})
