// app.js
App({
  onLaunch() {
    let that = this
    
    // 云函数
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        //   env 参数决定接下来小程序发起的云开发调用
        //（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "cloud1-6g54c3z2d06e52ec",
      })
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    that.showstatus()

    // 获取顶部导航栏高度
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  globalData: {
    userInfo: null,
    showtest1: false,
    firstIn: true,
  },

  watch: function (method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "showtest1", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._name = value;
        console.log('是否会被执行2')
        method(value);
      },
      get: function () {
        // 可以在这里打印一些东西，然后在其他界面调用getApp().globalData.name的时候，这里就会执行。
        console.log(this._name);
        return this._name
      }
    })
  },

  showstatus() {
    let that = this
    setTimeout(function () {
      that.globalData.showtest1 = true
    }, 4000)
  },

  // 登录（测试）
  getlogin(e) {
    console.log(this.globalData.firstIn);
    if (this.globalData.firstIn) {
      wx.getUserProfile({
        desc: 'desc',
        success: (res) => {
          console.log(res);
          this.globalData.firstIn = false
        },
        fail: () => {
          // 弹出错误
          wx.showToast({
            title: '已取消授权',
            icon: 'none',
          })
          wx.setStorage({
            key: 'thetoken',
            data: '',
          })
          this.globalData.firstIn = true
        }
      })
    }
    this.globalData.firstIn = false

  },

})
