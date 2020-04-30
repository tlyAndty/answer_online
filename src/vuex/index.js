import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  // 全局变量
  state: {
    user: undefined
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    login (state, payload) {
      state.user = payload
    },
    logout (state) {
      state.user = undefined
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    login (context, payload) {
      context.commit('login', payload)
    },
    logout (context) {
      context.commit('logout')
      console.log("退啦")
    }
  }
})

export default store

/*export default function () {
  const store = new Vuex.Store({
    // 全局变量
    state: {
      admin_or_user: {},
      token: "",
      title: ''
    },
    modules: {
      example
    },
    getters: {
      user(state) {
        if (!_.size(state.admin_or_user)) {
          var admin_or_user = {};
          var u = JSON.parse(window.localStorage.getItem("admin_or_user"));
          if (u) {
            admin_or_user = u;
          }
          localStorage.setItem("admin_or_user", JSON.stringify(admin_or_user));
          state.admin_or_user = admin_or_user; //this.$store.commit("setUser", user);
          return admin_or_user;
        }
        return state.admin_or_user
      },
      token(state) {
        return state.token
      }

    },
    // 修改全局变量必须通过mutations中的方法
    // mutations只能采用同步方法
    mutations: {
      login(state, admin_or_user) {
        var _admin_or_user = _.merge({}, state.admin_or_user);
        if (!_.size(_admin_or_user)) {
          _admin_or_user = {};
        }
        _.each(admin_or_user, function (value, key) {
          _user[key] = value;
        })
        sessionStorage.setItem("admin_or_user", JSON.stringify(_admin_or_user));
        state.admin_or_user = _admin_or_user;
      },
      setToken(state, token) {
        sessionStorage.setItem("token", token);
        state.token = token;
      },
      logout(state) {
        sessionStorage.clear();
        state.admin_or_user = {};
        state.token = null

      }
    },
  })
  return Store
}
*/
