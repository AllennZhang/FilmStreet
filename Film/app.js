//app.js  
//App({}) 创建一个应用程序对象
//如果不显式调用，系统也会自动创建
//也就是说：此文件可以留空
const wechat = require('./utils/wechat.js')
const douban = require('./utils/douban.js')
const baidu = require('./utils/baidu.js')
App({
  // 全局变量，外部用的时候只能以getApp().data.xxx访问
  data:{
    name:"豆瓣观影",
    version:'0.1.0',
    currentCity:'杭州',
    movieSource:[]
  },
  /**
   * WECHAT  API
   */
  wechat:wechat,
  /**
   * DOUBAN API
   */
  douban:douban,
  /**
   * BAIDU API
   */
  baidu:baidu,
  /**
   * 生命周期函数，初始化完成，会触发一次onLaunch(全局)
   */
  onLaunch(){
     wechat.getLocation()
           .then(res=>{
             const {latitude,longitude} = res
             return baidu.getCityName(latitude,longitude)
           })
           .then(name=>{
             this.data.currentCity =name.replace('市','')
             console.log(`currentCity : ${this.data.currentCity}`)
           })
           .catch(err=>{
             this.data.currentCity='杭州'
             console.log(err)
           })
  }
})