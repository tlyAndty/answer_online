<template>
  <el-container direction="vertical">
    <el-header v-if="$route.meta.keepAlive" class="header" height="60px" width="100%">
      <div>
        <div style="float:left;font-size: 30px; position:relative; top:7px ">
        探源问答
      </div>
        <div v-if="user" style="position: absolute;right: 15px;top: -15px">
          <router-link style="color:white;text-decoration:none;margin-right:20px;" :to="{name:'newquestionPage',query:{user_id:user.userId}}">我要提问</router-link>
          <router-link style="margin-right: 5px;color: #ffffff;text-decoration:none" :to="{name:'userGuide',query:{user_id:user.userId}}">{{user.name}}</router-link>
          <router-link style="margin-right: 15px;color: #ffffff;text-decoration:none;position: relative;top: 20px" :to="{name:'userGuide',query:{user_id:user.userId}}">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" height="50px" width="50px">
          </router-link>
        <el-dropdown trigger="click" style="color: white;margin-right: 10px;font-size: 16px">
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
          <router-link style="color: #ffffff;text-decoration:none" :to="{name:'main'}">首页</router-link>
        /
        <a id="logout_link1" href="/" @click="logout" style="color: white;text-decoration:none">登出</a>
      </div>
        <div v-else-if="admin" style="position: absolute;right: 15px;top: 17px ">
          <!--el-button class="new_question" onclick="window.location.href = '/newquestionPage'" style="display:inline-block;
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
          </el-button-->
          <router-link style="color:white;text-decoration:none;margin-right:15px" :to="{name:'newquestionPage',query:{user_id:admin.adminId}}">我要提问</router-link>
          <!--span style="margin-right: 5px">{{admin.name}}</span-->
          <router-link style="margin-right: 5px;color: #ffffff;text-decoration:none" :to="{name:'adminGuide',query:{admin_id:admin.adminId}}">{{admin.name}}</router-link>
          <el-dropdown trigger="click" style="color: white;margin-right: 10px;font-size: 16px">
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
          <!--a id="main_link1" href="/" style="color: white;text-decoration:none">首页</a-->
          <router-link style="color: #ffffff;text-decoration:none" :to="{name:'main'}">首页</router-link>
          /
          <a id="logout_link2" href="/" @click="logout" style="color: white;text-decoration:none">登出</a>
        </div>
        <div v-else style="position: absolute;right: 15px;top: 17px ">
          <router-link style="color:white;text-decoration:none;margin-right:15px" :to="{name:'userlogin'}">我要提问</router-link>
        <a id="main_link2" href="/" style="color: white;text-decoration:none">首页</a>
        /
        <a id="login_link" href="/userlogin" style="color: white;text-decoration:none">登录</a>
      </div>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: 'App',
    data(){
      return{
        //imageUrl:'',
      }
    },
    methods:{
      logout(){
        console.log("正在登出")
        this.$store.dispatch('logout')
        //sessionStorage.removeItem("user")
        //window.location.reload()
        //sessionStorage.setItem("store", null)
        console.log(this.$store.state)
        alert("登出成功")
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
      },
      admin() {
        return this.$store.state.admin
      },
      imageUrl(){
        return "http://localhost:8080"+this.$store.state.user.image
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
