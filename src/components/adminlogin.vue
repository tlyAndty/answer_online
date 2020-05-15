<template>
  <div class="bg">
    <div class="title">探源问答</div>
    <div class="panel">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="100px">
          <h1 style="padding-left:90px;">管理员登录</h1>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="user.Mail"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="user.Pwd" type="password"></el-input>
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
        Mail: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
        ],
        Pwd: [
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
              mail:this.user.Mail,
              pwd:this.user.Pwd
            })
          ).then(response => {
            console.log(response)
            console.log("登录成功")
            const {data} = response
            console.log('adminId:',data.data.adminId)
            this.data = data.data
            this.$store.dispatch('login',data.data.name)
            this.$router.push({
              path: '/adminGuide', query:{admin_id: this.data.adminId}
            });
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
    /*top:30%;*/
    width:350px;
    background-color: #333333;
    background: rgba(242,217,217,0.7);
    margin-top: 40px;
    padding-right: 100px;
    padding-top: 10px;
  }
  .loginBtn{
    background-color:#f08080;
    color:white;
  }

  .title {
    padding-top: 5%;
    position: relative;
    left: 52%;
    color: rgba(255, 255, 255, 0.8);
    font-size: 8em;
    letter-spacing: 0.1em;
    font-family: STHupo, serif;
    width: 600px;
    text-shadow: 5px 3px orangered;
  }
</style>

