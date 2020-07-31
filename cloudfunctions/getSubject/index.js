// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'coursehelper-test-nlsf4'})

// 云函数入口函数
exports.main = async (event, context) => {

  try{
    return await cloud.database().collection('subject').get();
  } catch(e){
    console.log(e);
  }
}