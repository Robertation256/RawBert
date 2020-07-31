// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'coursehelper-test-nlsf4'})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let subject_var = event.subject
  try{
    return await db.collection("course").where(
      {
        major: subject_var
      }
    ).field(
      {
        courseID: true,
        title: true,
        intro: true
  }).orderBy("title","asc").get();
  }
  catch(e){
    console.log(e);
  }
}