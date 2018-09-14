// pages/item/item.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageBackground:"https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2380677316.jpg",
    title:'豆瓣电影',
    movie:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.showLoading({
     title: '加载中请稍后...',
   })
   console.log(options)
   app.douban.fetchDetail(options.id)
             .then(res=>{
               this.setData({title:res.title,movie:res})
               wx.setNavigationBarTitle({title:res.title})
               wx.hideLoading()
               console.log(this.data.movie)
             })
             .catch(e=>{
               this.setData({title:"获取数据异常",movie:{}})
               console.error(e)
               wx.hideLoading()
               })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     wx.setNavigationBarTitle({
       title: this.data.title,
     })
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
    return {
      title:this.data.title,
      desc:this.data.title,
      path:'pages/item?id='+this.data.id
    }
  }
})