const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'发现',
    movie:{},
    bloopers:[],
    def_video_url: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    hideCover:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中请稍后...',
    })
    let sources= app.data.movieSource
    let index = Math.floor(Math.random() * sources.length)
    console.log(`sources-length:${sources.length},index:${index},randomSourceId:${sources[index]}`)
    app.douban.fetchDetail(sources[index])
              .then(res => {
                console.log("============response=============")
                console.log(res)
                console.log("============response=============")
                let resp = res.subject ? res.subject:res
                this.setData({ title: resp.title, movie: res, bloopers: resp.bloopers })
                wx.setNavigationBarTitle({ title: resp.title})
                wx.hideLoading()
                console.log(this.data.bloopers)
               })
               .catch(e => {
               this.setData({ title: "获取数据异常", movie: {} })
               console.error(e)
               wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
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
    
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  videoPlayCallback:function(){
    this.videoContext.play()
  },
  videoPauseCallback:function(){
    this.videoContext.pause()
  },
  videoEndCallback:function(){
    this.setData({ hideCover:false})
    console.log('播放完毕')
  },
  playVideo:function(view){
    this.setData({hideCover:true})
    this.videoContext.play()
  }
})