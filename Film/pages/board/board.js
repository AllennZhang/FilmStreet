
//获取全局应用程序实例对象
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
        imgUrls:[
          'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2380677316.jpg',
          'https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2386736909.jpg',
          'https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2382076389.jpg',
          'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2388681695.jpg',
          'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2387538436.jpg'
        ],
        indicatorDots:true,
        autoPlay:true,
        interval:5000,
        duration:1000,
        indicatorColor:'#ccc',
        indicatorActivieColor:'#fff',

        boards:[
          {key:'in_theaters'},
          {key:'coming_soon'},
          {key:'new_movies'},
          {key:'us_box'},
          {key:'weekly'},
          {key:'top250'}
        ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中请稍后...',
    })
    const tasks = this.data.boards.map(board=>{
      return app.douban.fetchMovies(board.key,1,12)
             .then(dou=>{
               board.title = dou.title
               board.movies=dou.subjects
               return board
             })
    })

    Promise.all(tasks)
           .then(boards=>{
             this.setData({boards:boards,loading:false})
             console.log(boards)
             let tmpArr = new Array()
             for(let board of boards){
               //除此类别类别下面没有视频
               if (board.key == "in_theaters"){
                   for (let item of board.movies) {
                     tmpArr.push(item.id)
                    }
               }
             }
             app.data.movieSource=tmpArr
            //  that.app.setData({movieSource:tmpArr})
             console.log(app.data.movieSource)
             wx.hideLoading()
           })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
})