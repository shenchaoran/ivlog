export default {
    state: {},
    getters: {},
    actions: {
        login: async ({commit, dispatch, state}, {}) => {
            wx.login({
     success: function(res) {
            console.log(res);
            if (res.code) {

            } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
            }
      },
  fail: function(){
    console.log("启用wx.login函数，失败！");
  },
  complete:function(){
    console.log("已启用wx.login函数");
  }
})
        },
        logout: async ({commit, dispatch, state}, {}) => {

        },
        resetPwd: async ({commit, dispatch, state}, {}) => {

        },
    },
    mutations: {},
}