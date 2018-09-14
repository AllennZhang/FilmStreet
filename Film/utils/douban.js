const URI = 'https://douban.uieee.com/v2/movie'
// const URI = 'https://api.douban.com/v2/movie'
const fetch = require('./fetch')


/**
 * 抓取豆瓣电影特定类型的API
 */
function fetchApi(type,parmas){
  return fetch(URI,type,parmas)
}

/**
 * 获取电影数据
 */
function fetchMovies(type,page=1,count=20,search=''){
  let params = { start: (page - 1) * count, count: count, city: getApp().data.currentCity}
  return fetchApi(type,search ? Object.assign(params,{q:search}):params)
         .then(res=> res.data)
}
/**
 * 获取某条电影详情
 */
function fetchDetail(id){
  return fetchApi('subject/'+id)
         .then(res=>res.data)
}

module.exports = { fetchMovies, fetchDetail}