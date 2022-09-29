
/**
 * 封装toast
 * @param {} title 
 * @returns 
 */
export const showToast = (title) =>{

  return new Promise((resolve,reject)=>{

    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000,
      success:(result)=>{
        resolve(result);
       },
  
       fail:(err)=>{
        reject(err);
       },
    });

      
  })  
}


/**
 * 封装wx.login
 * @param {} title 
 * @returns 
 */
 export const wxLogin = () =>{

  return new Promise((resolve,reject)=>{

    wx.login({
      timeout:10000,
      success:(result)=>{
        resolve(result);
       },
  
       fail:(err)=>{
        reject(err);
       },
    });  
  })  
}



/**
 * 封装modal
 * @param {*} title 
 * @returns 
 */
export const showModal = (title) =>{

  return new Promise((resolve,reject)=>{

    wx.showModal({
      title: '提示',
      content: title,
      success:(result)=>{
        resolve(result);
       },
  
       fail:(err)=>{
        reject(err);
       },
    }); 
  })  
}



/**
 * 封装微信支付
 * @param {*}  
 * @returns 
 */
 export const wxPay = (pay) =>{

  return new Promise((resolve,reject)=>{

    wx.requestPayment({
     ...pay,
     success:(result)=>{
      resolve(result);
     },

     fail:(err)=>{
      reject(err);
     },
    });
  })  
}