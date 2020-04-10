<template>
  <el-container>
    <el-header class="header" height="60px" width="100%">
      <span style="font-size: 30px; position:relative; top:5px ">探源问答</span>
      <span v-if="user" style="position:relative; left: 1050px; top:4px"> {{user.name}}
        <a id="logout_link" href="localhost:8080/logout" style="color: white;text-decoration:none">登出</a>
        <!--el-button  @click="logout">注销</el-button-->
      </span>
      <span v-else style="position:relative; left: 80%; top:4px" >
        <a id="login_link" href="localhost:8080/login" style="color: white;text-decoration:none">登录</a>
        /
        <a id="register_link" href="localhost:8080/register" style="color: white;text-decoration:none">注册</a>
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
