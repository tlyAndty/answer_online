<template>
  <div class="registertext">
    <div class="panel">
      <el-row type="flex" justify="center">
        <el-form ref="registerForm" :model="user" :rules="rules" status-icon label-width="120px">
          <h1 style="padding-left:90px;">用户注册</h1>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="user.mail"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="user.pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="conPwd">
            <el-input v-model="user.conPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item id="confirm" label="邮箱验证码" prop="confirmCode">
            <el-row :gutter="24">
              <el-col :span="10" id="confirmCode"><el-input  v-model="user.confirmCode"></el-input></el-col>
              <el-col :span="10" ><el-button id="confirmBtn" class="Btn" @click="confirmBtn">获取邮箱验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button  style="width:300px;" class="Btn" @click="register">注册</el-button>
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
import {isValidConfirmCode} from '../js/rule'

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
          if (this.user.pwd !== '') {
            this.$refs.registerForm.validateField('conPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码!'));
        } else if (value !== this.user.pwd) {
          callback(new Error('两次输入密码不一致!'));
        }
          callback();
      };
      var validateConfirmCode = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请输入验证码!'));
        }else  if (!isValidConfirmCode(value)){
          callback(new Error('请输入六位验证码！'))
        }else {
          callback()
        }
      };


      return {
        user: {
          name:"",
          mail:"",
          pwd:"",
          conPwd:"",
          confirmCode:""
        },
        rules: {
          name: [
            {required: true, message: '请输入昵称!', trigger: 'blur'}
          ],
          mail: [
            {required: true, trigger: 'blur',validator: validMail}
          ],
          pwd: [
            {required: true, trigger: 'blur', validator: validatePass},
            { min: 6, max: 20, message: '请输入6-20位字符!', trigger: 'blur' }
          ],
          conPwd: [
            {required: true, trigger: 'blur', validator: validatePass2}
          ],
          confirmCode: [
            {required: true, trigger: 'blur', validator:validateConfirmCode}
          ]
        }
      }

    },
    methods: {
      confirmBtn() {

            this.$axios.post(
              'http://localhost:8080/online_answer/user/mailConfirm',
              qs.stringify({
                mail: this.user.mail
              })
            ).then(response => {
              console.log(response)
              console.log("验证码发送成功")
              const {data} = response
              console.log('data', data)
              this.data = data
            }).catch(error => {
              console.log(error)
            })

        },
      register() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.$axios.post(
              'http://localhost:8080/online_answer/user/register',
              qs.stringify({
                name : this.user.name,
                mail : this.user.mail,
                pwd : this.user.pwd,
                confirmCode : this.user.confirmCode
              })
            ).then(response => {
              console.log(response)
              alert("注册成功，请等待审核")
              const {data} = response
              console.log('data', data)
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
  .registertext{
    text-align:center;
    background: url(../assets/login_bg.jpg);
    background-repeat: no-repeat;
    height:662px;
  }
  .panel{
    position: relative;
    width:500px;
    background-color: #333333;
    background: rgba(242,217,217,0.7);
    top:18%;
    left:30%;
    padding-right: 100px;
    padding-top: 10px;
  }
  .Btn{
    background-color:#f08080;
    color:white;
  }
</style>
