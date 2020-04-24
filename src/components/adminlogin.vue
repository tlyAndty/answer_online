<template>
  <div class="bg">
    <div class="panel">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="100px">
          <h1 style="padding-left:90px;">管理员登录</h1>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="user.mail"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="user.pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="loginBtn"  style="width:100px;" @click="login">登录</el-button><br>
          </el-form-item>
        </el-form>
      </el-row>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      user: {},
      rules: {
        mail: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post(
            'http://localhost:8080/online_answer/admin/login',
            qs.stringify({
              // loginForm: this.loginForm
              mail:"246228924@qq.com",
              pwd:"1"
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
    }
  }
}
</script>

<style>
  .bg{
    text-align:center;
    background: url(../assets/login_bg.jpg);
    background-repeat: no-repeat;
    height:660px;
  }
  .panel{
    position: relative;
    float:right;
    right:10%;
    top:30%;
    width:350px;
    background-color: #333333;
    background: rgba(242,217,217,0.7);
    padding-right: 100px;
    padding-top: 10px;
  }
  .loginBtn{
    background-color:#f08080;
    color:white;
  }
</style>

