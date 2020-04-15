<template>
  <div class="logintext">
    <h1>登录1</h1>
    <el-row type="flex" justify="center">
      <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="user.mail"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="user.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="confirmCode">
          <el-input type="text" v-model="user.confirmCode" auto-complete="off" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%" class="login_remember">
          <!--验证码-->
          <el-image :src="confirmCode" @click="refreshCode" alt="加载失败" >
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading"></i>
            </div>
          </el-image>
          <el-link class="rele_code" type="primary" @click="refreshCode">刷新</el-link>
        </el-form-item>
        <el-form-item>
          <el-button  @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      user: {},
      confirmCode: "http://localhost:8080/online_answer/common/captcha.jpg?t=" + new Date().getTime(),
    rules: {
        mail: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        confirmCode: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  // beforeMount:{
  //   val src="http://localhost:8080/online_answer/admin/defaultKaptcha",
  // },



  // mounted:function(){
  //   this.createcode();//需要触发的函数
  // },

  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post(
            'http://localhost:8080/online_answer/common/imgvrifyControllerDefaultKaptcha',
            qs.stringify({
              // loginForm: this.loginForm
              mail:"246228924@qq.com",
              pwd:"1",
              confirmCode:"123"
            })
          ).then(response => {
            console.log(response)
            console.log("登录成功")
            const {data} = response
            console.log('data',data)
            this.data = data
          }).catch(error => {
            console.log(error)
          })
        } else {
          return false
        }
      })
    },

    // createcode(){
    //   var self = this;
    //   axios.post("http://localhost:8080/online_answer/common/captcha.jpg").then(function(res){
    //     console.log("confirm初始化了吗？"),
    //     console.log(res)
    //   });
    // },

    refreshCode() {
      this.confirmCode = "http://localhost:8080/online_answer/common/captcha.jpg?t=" + new Date().getTime();
    }

  }
}
</script>

<style>
  .el-button{
    background-color: lightcoral;
    color: white;
    background-image: url("../assets/login_bg.jpg");
  }
  .logintext{
    text-align:center;
  }
  header{
    background-color: white;
  }
  .confirm>>>el-input {
    width:40%;
  }
</style>

