<template>
    <div class="bg">
      <div class="title">探源问答</div>
      <div class="panel">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="100px">
            <h1 style="padding-left:90px;">用户登录</h1>
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model="user.mail"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="user.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="loginBtn"  style="width:100px;" @click="userlogin">登录</el-button><br>
              <router-link style="float: left;text-decoration: none" to="register">
                <span class="register">没有账号？注册一下</span>
              </router-link>
              <div class="del_comment" style="float: right;margin-left: 20px" @click="dialogFormVisible = true">
                忘记密码
              </div>
              <el-dialog title="忘记密码" :visible.sync="dialogFormVisible">
                <el-form :model="forgotPwdForm">
                  <el-form-item label="邮箱" label-width="110px">
                    <el-input v-model="forgotPwdForm.mail" type="text"  style="width: 300px;margin-bottom: 5px;float: left" autocomplete="off" placeholder="请输入邮箱地址"></el-input>
                    <a href="#" style="color: black;margin-left: 20px;float: left" @click="sendToMail(forgotPwdForm.mail)">发送验证码</a>
                  </el-form-item>
                  <el-form-item label="新密码" label-width="110px">
                    <el-input v-model="forgotPwdForm.pwd" type="password"  style="width: 300px;margin-bottom: 5px;float: left" autocomplete="off" placeholder="请输入新密码"></el-input>
                  </el-form-item>
                  <el-form-item label="验证码" label-width="110px">
                    <el-input v-model="forgotPwdForm.confirmCode" type="text" style="width: 300px;float: left;"  autocomplete="off" placeholder="请输入验证码"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button @click="forgotPwdSubmit(forgotPwdForm.mail,forgotPwdForm.pwd,forgotPwdForm.confirmCode)">确 定</el-button>
                </div>
              </el-dialog>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
      <div id="footer">
        <div >
          <a id="main" href="/" style="margin-right:10px;color:black;text-decoration:none">首页</a>
          <a id="admin_login" href="/adminlogin" style="margin-left:10px;color:black;text-decoration:none">管理员登录</a>
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
        },
        forgotPwdForm:{
          mail:'',
          pwd:'',
          confirmCode:''
        },
        dialogFormVisible: false,
      }
    },
    methods: {
      userlogin() {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              this.$axios.post(
                'http://localhost:8080/online_answer/user/login',
                qs.stringify({
                  // loginForm: this.loginForm
                  mail: this.user.mail,
                  pwd: this.user.pwd,
                })
              ).then(response => {
                const {data} = response
                alert(response.data.resultDesc);
                if(response.data.resultCode === "4000"){
                  console.log('userId：',data.data.userId)
                  this.data = data.data
                  data.data.role='user';
                  this.$store.dispatch('userlogin',data.data);
                  this.$router.push({
                    path: '/userGuide', query:{user_id: this.data.userId,user_image: this.data.image}
                  });
                }
              }).catch(error => {
                alert("请求发送失败");
                console.log(error)
              })
            } else {
              return false
            }
          })
      },
      sendToMail(mail){
        this.$axios.post(
          'http://localhost:8080/online_answer/user/mailConfirm',
          qs.stringify({
            mail:mail
          })
        ).then(response => {
          console.log("发送结果：",response.data)
          alert(response.data.resultDesc)
          //history.go(0)
        }).catch(error => {
          console.log(error)
        })
      },
      forgotPwdSubmit(mail,pwd,confirmCode){
        this.$axios.post(
          'http://localhost:8080/online_answer/user/forgetPwd',
          qs.stringify({
            mail:mail,
            pwd:pwd,
            confirmCode:confirmCode
          })
        ).then(response => {
          console.log("验证结果：",response.data)
          alert(response.data.resultDesc)
          //history.go(0)
        }).catch(error => {
          console.log(error)
        })
      },
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
  html,body{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0;
    /*外部间距也是如此设置*/
    margin: 0;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .header{
    background-color: lightcoral;
    color: white;
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
    padding-top:60px;
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
