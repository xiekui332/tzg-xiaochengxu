//app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        if (res.code) {
          wx.request({
            url: 'https://api.taozugong.com/award/user/login',
            method: 'GET',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: (res) => {
              if (res.data.code == 200) {
                this.globalData.openId = res.data.data.openId
                this.globalData.tzgUserInfo = res.data.data
              } else if (res.data.code == 1003) { //未授权
                this.globalData.openId = res.data.data
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              wx.request({
                url: 'https://api.taozugong.com/award/user/addUserInfo',
                method: 'POST',
                data: {
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
                  openId: this.globalData.openId,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: (res) => {
                  //1010 已授权
                  if (res.data.code == 200) { //第一次保持用户信息
                    this.globalData.tzgUserInfo = res.data.data
                  }
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else if (!res.authSetting['scope.userInfo']) { //没有授权
          wx.authorize({
            scope: 'scope.userInfo',
            success: (res) => {
              console.log(res)
            }
          })
        }
      }
    });
  },
  onShow() {
  },
  globalData: {
    openId: '',
    baseUrl: 'https://api.taozugong.com/award',
    userInfo: null, //wx
    tzgUserInfo: ''
  }
})