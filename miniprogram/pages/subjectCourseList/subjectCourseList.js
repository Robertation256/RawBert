// miniprogram/pages/subjectCourseList/subjectCourseList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: "",
    course_list: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let s = options.subject;
    this.setData({subject: s})
    wx.cloud.callFunction({
      name: "getCourse",
      data: {subject: s},
      success: (res)=>{
        console.log(res)
      that.setData(
        {
          course_list: res.result.data
        }
      )
    },
      fail: (e)=>{console.log(e)}
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