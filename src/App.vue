<template>
  <el-container>
    <el-header v-if="$route.meta.keepAlive" class="header" height="60px" width="100%">
      <span style="font-size: 30px; position:relative; top:5px ">
        探源问答
      </span>
      <span v-if="user" style="position:relative;left: 30px;top:4px">
        <el-button class="new_question" onclick="window.location.href = '/newquestionPage'" style="display:inline-block;
                                               width: 100px;
                                               height: 36px;
                                               font-size: 14px;
                                               background-color: lightcoral;
                                               border-radius:5px;
                                               text-align: center;
                                               color: white;
                                               border-color: white;">
          我要提问
        </el-button>
      </span>
      <span v-else style="position:relative;left: 30px;top:4px">
        <el-button class="new_question" onclick="window.location.href = '/userlogin'" style="display:inline-block;
                                               width: 100px;
                                               height: 36px;
                                               font-size: 14px;
                                               background-color: lightcoral;
                                               border-radius:5px;
                                               text-align: center;
                                               color: white;
                                               border-color: white;">
          我要提问
        </el-button>
      </span>
      <span v-if="user" style="position:relative; left: 900px; top:4px">
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
        <span style="margin-right: 5px">{{user}}</span>
        <a id="main_link" href="/" style="color: white;text-decoration:none">首页</a>
        /
        <a id="logout_link" href="/logout" style="color: white;text-decoration:none">登出</a>
      </span>
      <span v-else style="position:relative; left: 70%; top:4px" >
        <a id="login_link" href="/userlogin" style="color: white;text-decoration:none">登录</a>
        /
        <a id="register_link" href="/register" style="color: white;text-decoration:none">注册</a>
        <!--el-button  @click="login" >登录</-el-button> /<el-button  @click="register" >注册</el-button-->
      </span>

    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'App',
    methods:{
      /*login () {
        this.$router.replace('/login')
      },
      logout () {
        this.$store.dispatch('logout').then(() => {
          this.$router.replace('/')
        })
      },
      register()
      {
        this.$router.replace('/register');
      }*/
    },
    computed: {
      user () {
        //假定已登录
        //this.$store.state.user = 'test'
        return this.$store.state.user
      }
    }
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
