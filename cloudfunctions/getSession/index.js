// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'coursehelper-test-nlsf4'})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var ID = event.courseID;
  try {
    return await  db.collection("session").where(
      {
        courseID: ID
      }
    ).orderBy("component","asc").get();    
  }
  catch(e) {
    return e;
  }

}