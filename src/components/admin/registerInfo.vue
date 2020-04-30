<template>
  <div class="top">
    <span style="font-size: 30px">注册用户详情</span>
    <el-form ref="registerForm" :model="user" :rules="rules"  style="margin:40px auto;width: 500px">
      <el-form-item label="昵称" prop="name">
        <el-input class="text" placeholder=data.name v-model="user.name" :readonly="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input class="text" placeholder=data.mail v-model="user.mail" :readonly="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input class="text" placeholder=data.pwd v-model="user.pwd" type="password" :readonly="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import qs from 'qs';
  import {isValidMail} from "../../js/rule";

  export default {
    name: "registerInfo",
    data() {
      return {
        user: {
          name:'',
          mail:'',
          pwd: '',
        },
        rules: {
        },
        Mail:'',
      }

    },
    created() {
      this.getParams()
      this.getrData()
    },
    watch:{
      '$route':'getParams'
    },
    methods: {
      getParams:function () {
        this.Mail = this.$route.query.user_mail
        console.log("传来的mail参数=="+this.Mail)
      },
      getrData: function () {
        this.$axios.post('http://localhost:8080/online_answer/common/viewUserInfo',
          qs.stringify({
            mail : this.Mail,
          })
        ).then((response) => {
          console.log("registerInfo:",response);
          this.rData = response.data.data;
          this.user.name = this.rData.name
          this.user.mail = this.rData.mail
          this.user.pwd = this.rData.pwd
          console.log("rname",this.rData.name)
        }).catch((error) => {
          console.log(error);
        });
      },
    }
  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
