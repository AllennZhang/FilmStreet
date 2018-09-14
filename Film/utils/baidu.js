const URI = 'https://api.map.baidu.com'
const fetch = require('./fetch')

function fetchApi(type,params){
  return fetch(URI,type,params)
}


function getCityName(latitude=30.26667,longitude=120.20000){
  const params = { location: `${latitude},${longitude}`, output: 'json', ak:'B61195334f65b9e4d02ae75d24fa2c53'}
  return fetchApi('geocoder/v2/',params)
         .then(res=> res.data.result.addressComponent.city)
}




module.exports = {getCityName}