// miniprogram/pages/sessionList/sessionList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseID: "",
    courseTitle: "",
    courseIntro: "",
    groupings: [],

    introSign: "+",
    openIntro: false,
    signList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseID: options.courseID,
      courseIntro: options.intro,
      courseTitle: options.title
    })
    let that = this;
    wx.cloud.callFunction(
      {
        name: "getSession",
        data: {
          courseID: options.courseID
        },
        success: (res)=>{
          let sessionList = res.result.data;
          if (sessionList.__proto__ == Object.__proto__) {
            sessionList = [sessionList];
          }
          let componentType = [];
          let result = [];
          for (let i = 0; i < sessionList.length; i++) {
            switch (sessionList[i].status) {
              case "Open":
                sessionList[i].status_color = "green";
                break;
              case "Cancelled":
                sessionList[i].status_color = "red";
                break;
              default:
                sessionList[i].status_color = "orange";

            }
          }
          for (let i = 0; i < sessionList.length; i++) {
            if (componentType.length == 0 || sessionList[i].component != componentType[componentType.length-1]) {
              componentType.push(sessionList[i].component);
              result.push([sessionList[i]]);
            }
            else {
              result[result.length-1].push(sessionList[i])
            }
          }
          let grouping = [];
          for (let i = 0; i < componentType.length; i++) {
            let obj = Object();
            obj.component = componentType[i];
            obj.sessionList = result[i];
            obj.sign = "+";
            obj.open = false;
            obj.index = i;
            grouping.push(obj);
          }
          that.setData(
            {
              groupings: grouping
            }
          );
          console.log(grouping);
        },
        fail: (e)=>{
          console.log(e);
        }
      }
    )

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

  },

  clickIntro: function() {
    if (this.data.introSign == "+") {
      this.setData(
        {
          introSign: "-",
          openIntro: true
        }
      )
    }
    else {
      this.setData(
        {
          introSign: "+",
          openIntro: false
        }
      )
    }
  },

  clickTag: function(e) {
    let index = e.currentTarget.dataset.index;
    let orginal_groupings = this.data.groupings;
    if (orginal_groupings[index].sign == "+") {
      orginal_groupings[index].sign = "-";
      orginal_groupings[index].open = true;
    }
    else {
      orginal_groupings[index].sign = "+";
      orginal_groupings[index].open = false;
    }
    this.setData(
      {
        groupings: orginal_groupings
      }
    )
  }
})