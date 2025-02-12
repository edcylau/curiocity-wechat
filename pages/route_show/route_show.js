// pages/route_show/route_show.js
const config = require('../../key');
const app = getApp()
const host = app.globalData.host;
Page({

  /**
   * Page initial data
   */
  data: {
    mapKey: config.mapKey
  },

  toggleFavorites: function (e) {

    const page = this

      let newFavorite = {};
        newFavorite.favorited = this.data.favorited
        newFavorite.id = e.currentTarget.dataset.id
        newFavorite.user_id = parseInt(app.globalData.userId)
        console.log(newFavorite);
        console.log('url: ', app.globalData.host + `route_favorite`)
      let route = page.data.route

        wx.request({
          url: app.globalData.host + `route_favorite`,
          method: 'GET',
          data: newFavorite,
            success(res) {
              console.log("result", res)
                if (route.favorited) {
                  route.favorited = false
                  page.setData({ route })
                } else {
                  route.favorited = true
                  page.setData({ route })
                }
            }
        })
    },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const userId = app.globalData.userId;

    // const id = 4 AC: testing
    console.log("user", userId)
    const page = this
    const id = options.id
    console.log(1, options)
    wx.request({
      url: host + `routes/${id}?user_id=${userId}`,
      success: function (res) {
        let favorite = res.data.favorited
          console.log("favorite", favorite)
          page.setData({ favorited: !page.data.favorited })
        const route = res.data
          console.log(2, route)
          page.setData({ route })

        const checkpoints = route.checkpoints;
        console.log(3, checkpoints)
        const latitude = checkpoints[0].latitude
        const longitude = checkpoints[0].longitude
        var temp = []
        var markers = []
        for (var i = 0; i < checkpoints.length; i++) {
          temp.push({
            latitude: checkpoints[i].latitude,
            longitude: checkpoints[i].longitude
          })
          markers.push({ // 获取返回结果，放到mks数组中
            id: i,
            latitude: checkpoints[i].latitude,
            longitude: checkpoints[i].longitude,
            iconPath: '/icons/map/flag.png', //图标路径
            width: 30,
            height: 30,
            callout: { //可根据需求是否展示经纬度
              content: checkpoints[i].name,
              color: '#000',
              borderRadius: "10",
              padding: "5",
              display: 'ALWAYS'
            }
          })
        }
        var polyline = [{
          points: temp,
          color: "#C90E9D",
          width: 4,
          dottedLine: true
        }];
        page.setData({
          longitude: longitude,
          latitude: latitude,
          polyline: polyline,
          markers: markers,
          temp: temp
        })
      console.log(4, polyline)
      }
    })
  },

  tapCard: function (event) {
    console.log(event)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/building_show/building_show?id=${id}`
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

bindMarkertap: function(e) {
  console.log(e)
},

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})