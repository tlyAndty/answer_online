<template>
  <div class="bg">
    <div class="title">探源问答</div>
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
            <el-button class="loginBtn"  style="width:100px;" @click="adminlogin">登录</el-button><br>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div id="footer">
      <div >
        <a id="main" href="/" style="margin-right:10px;color:black;text-decoration:none">首页</a>
        <a id="user_login" href="/userlogin" style="margin-left:10px;color:black;text-decoration:none">用户登录</a>
      </div>
      <span>Copyright © 2020-3020 tly&ty. All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
import {isValidMail} from '../js/rule'
export default {
  data() {
    var validMail=(rule, value,callback)=>{
      if (!value){
        callback(new Error('请输入邮箱！'))
      }else  if (!isValidMail(value)){
        callback(new Error('请输入正确的邮箱！'))
      }else {
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码!'));
      } else {
        callback();
      }
    };
    return {
      user: {
        mail:"",
        pwd:""
      },
      rules: {
        mail: [
          {required: true, trigger: 'blur',validator: validMail}
        ],
        pwd: [
          {required: true, trigger: 'blur', validator: validatePass},
          { min: 6, max: 20, message: '请输入6-20位字符!', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    adminlogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post(
            'http://localhost:8080/online_answer/admin/login',
            qs.stringify({
              // loginForm: this.loginForm
              mail:this.user.mail,
              pwd:this.user.pwd
            })
          ).then(response => {

            const {data} = response
            alert(response.data.resultDesc);
            if(response.data.resultCode === "4000") {
              this.data = data.data
              data.data.role = 'admin';
              this.$store.dispatch('adminlogin', data.data)
              this.$router.push({
                path: '/adminGuide', query: {admin_id: this.data.adminId}
              });
            }
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
    height:663px;
    text-align:center;
    background: url(../assets/login_bg.jpg);
    background-repeat: no-repeat;
  }
  #footer{
    background-color: rgba(255, 255, 255, 0.3);
    text-align: center;
    font-size: 12px;
    height: 40px;
    /*margin-top: 61px;*/
    position: fixed;
    bottom: 0;
    width:100%;
  }
  .panel{
    position: relative;
    left:55%;
    width:350px;
    background-color: #333333;
    background: rgba(242,217,217,0.7);
    margin-top: 25px;
    padding-right: 100px;
    padding-top: 10px;
  }
  .loginBtn{
    background-color:#f08080;
    color:white;
  }

  .title {
    padding-top: 60px;
    position: relative;
    left: 46%;
    color: rgba(255, 255, 255, 0.8);
    font-size: 8em;
    letter-spacing: 0.1em;
    font-family: STHupo, serif;
    width: 600px;
    text-shadow: 5px 3px orangered;
  }
</style>

