<template>
  <el-container direction="vertical">
    <el-header v-if="$route.meta.keepAlive" class="header" height="60px" width="100%">
      <div>
        <div style="float:left;font-size: 30px; position:relative; top:5px ">
        探源问答
      </div>
        <div v-if="user" style="float:right;position:relative; top:10px ">
        <el-button class="new_question" onclick="window.location.href = '/newquestionPage'" style="display:inline-block;
                                               width: 100px;
                                               height: 36px;
                                               font-size: 14px;
                                               background-color: lightcoral;
                                               border-radius:5px;
                                               text-align: center;
                                               color: white;
                                               border-color: white;
                                               margin-right:15px">
          我要提问
        </el-button>
        <span style="margin-right: 5px">{{user}}</span>
        <el-dropdown trigger="click" style="color: white;margin-right: 10px">
          <span class="el-dropdown-link">
            消息
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              <a href="" style="text-decoration:none">回答</a>
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <a href="" style="text-decoration:none">评论</a>
              <el-badge class="mark" :value="3" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a id="main_link1" href="/" style="color: white;text-decoration:none">首页</a>
        /
        <a id="logout_link" href="/" @click="logout" style="color: white;text-decoration:none">登出</a>
      </div>
        <div v-else style="float:right;position:relative; top:10px ">
        <el-button class="new_question" onclick="window.location.href = '/userlogin'" style="display:inline-block;
                                               width: 100px;
                                               height: 36px;
                                               font-size: 14px;
                                               background-color: lightcoral;
                                               border-radius:5px;
                                               text-align: center;
                                               color: white;
                                               border-color: white;
                                               margin-right:15px">
          我要提问
        </el-button>
        <a id="main_link2" href="/" style="color: white;text-decoration:none">首页</a>
        /
        <a id="login_link" href="/userlogin" style="color: white;text-decoration:none">登录</a>
      </div>
      </div>
    </el-header>
    <el-main>
      <!--router-view v-if="isRouterAlive"></router-view-->
      <router-view/>
    </el-main>
    <!--el-footer style="height: 40px;">
      <div style="margin-right: 40px;margin-left: 40px;margin-top: 5px;font-size: 12px">
        <div style="">
        <a id="admin_login" href="/adminlogin" style="color:black;text-decoration:none">管理员登录</a>
        </div>
        <span>Copyright © 2020-3020 tly&ty. All Rights Reserved.</span>
      </div>
    </el-footer-->
  </el-container>
</template>

<script>

  export default {
    name: 'App',
    /*provide(){
      return {
        reload: this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true
      }
    },*/
    methods:{
      logout(){
        console.log("正在登出")
        this.$store.dispatch('logout')
        //sessionStorage.removeItem("user")
        //window.location.reload()
        //sessionStorage.setItem("store", null)
        console.log(this.$store.state)
      },
      reload(){
        this.isRouterAlive=false
        this.$nextTick(()=>this.isRouterAlive=true)
      },
    },
    created() {
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        console.log("存vuex前的数据")
        console.log(this.$store.state,JSON.parse(sessionStorage.getItem("store")))

        sessionStorage.setItem("store", JSON.stringify(this.$store.state))

        console.log("存vuex后的数据")
        console.log(this.$store.state,JSON.parse(sessionStorage.getItem("store")))
      })
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        console.log("读取sessionstorage前的数据")
        console.log(this.$store.state,JSON.parse(sessionStorage.getItem("store")))

        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))

        console.log("读取sessionstorage后的数据")
        console.log(this.$store.state,JSON.parse(sessionStorage.getItem("store")))
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
  }
</script>

<style>
  html,body{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .header{
    background-color: lightcoral;
    color: white;
  }
</style>
