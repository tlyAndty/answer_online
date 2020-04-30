<template>
  <div class="top">
    <div style="text-align: left">
      <a href="javascript:history.back(-1)" style="text-decoration: none;color: #606266;">返回上一页</a>
    </div>
    <span style="font-size: 30px;">注册用户详情</span>
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
      <el-form-item label="注册时间" prop="pwd">
        <el-input class="text" placeholder=data.add_time v-model="user.add_time" :readonly="true">
        </el-input>
      </el-form-item>
    </el-form>
    <el-button @click="acceptUser(user.user_id)" style="margin-right: 100px">通过</el-button>
    <el-button @click="rejectUser(user.user_id)" style="margin-left: 100px">拒绝</el-button>
  </div>
</template>

<script>
  import qs from 'qs';
  import {isValidMail} from "../../js/rule";

  export default {
    name: "registerInfo",
    data() {
      return {
        rData:{},
        user: {
          user_id:'',
          name:'',
          mail:'',
          pwd: '',
          add_time:'',
        },
        rules: {
        },
        Mail:'',
        id:'',
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
        this.id = this.$route.query.user_id
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
          this.user.user_id = this.rData.userId
          this.user.name = this.rData.name
          this.user.mail = this.rData.mail
          this.user.pwd = this.rData.pwd
          this.user.add_time = this.dateFormat(this.rData.addTime)
          //console.log("rname:",response.data.data.userId)
          console.log("rname:",this.rData)
        }).catch((error) => {
          console.log(error);
        });
      },
      rejectUser(val){
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
          qs.stringify({
            userId: val,
            userState: '3',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          console.log("修改成功")
        }).catch((error) => {
          console.log(error);
        });
        this.$router.push({path:'registrationAudit',query:{admin_id: this.id}})
        location.reload()
      },
      acceptUser(val){
        console.log(val)
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
          qs.stringify({
            userId: val,
            userState: '1',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          console.log("修改成功")
        }).catch((error) => {
          console.log(error);
        });
        this.$router.push({path:'registrationAudit',query:{admin_id: this.id}})
        location.reload()
      },
      dateFormat(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      }
    }
  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
