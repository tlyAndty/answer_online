<template>
  <div class="registertext">
  <el-row type="flex" justify="center">
    <el-form ref="registerForm" :model="user" :rules="rules" status-icon label-width="120px">
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
          <el-col :span="10" ><el-button id="confirmBtn" @click="confirmBtn">获取邮箱验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button  style="width:300px;" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </el-row>
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
        if (value === '') {
          callback(new Error('请输入密码!'));
        } else {
          if (this.user.pwd !== '') {
            this.$refs.registerForm.validateField('conPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        user: {},
        rules: {
          name: [
            {required: true, message: '昵称不能为空', trigger: 'blur'}
          ],
          mail: [
            {required: true, trigger: 'blur',validator: validMail}
          ],
          pwd: [
            {required: true, trigger: 'blur', validator: validatePass}
          ],
          conPwd: [
            {required: true, trigger: 'blur', validator: validatePass2}
          ],
          confirmCode: [
            {required: true, message: '邮箱验证码不能为空', trigger: 'blur'}
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
              console.log("注册成功，请等待审核")
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
  .el-button{
    background-color: lightcoral;
    color: white;
  }
  .registertext{
    text-align:center;
  }

</style>
