export const request = (params) =>{

  let adaxTime = 0;

  wx.showLoading({
    title: '加载中',
    mask: true
  });
    
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"


  return new Promise((resolve,reject)=>{

    adaxTime++;

    var reqTask = wx.request({
      ...params,
      url:baseUrl+params.url,
     success:(result)=>{
      resolve(result);
     },

     fail:(err)=>{
      reject(err);
     },

     complete:()=>{
      adaxTime--;

      if (adaxTime===0) {
        wx.hideLoading()
      }
     }
    });
      
  })  
}