<template>
  <div class="registertext">
    <h1>注册</h1>
  <el-row type="flex" justify="center">
    <el-form ref="registerForm" :model="user" :rules="rules" status-icon label-width="80px">
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="user.mail"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="user.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </el-row>
  </div>
</template>

<script>
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
      register() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.$axios.get(
              '127.0.0.1/user/query',
              qs.stringify({
                registerForm: this.registerForm
                // SearchValue: this.SearchValue
                // //username: this.username,
                // //password: this.password
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
