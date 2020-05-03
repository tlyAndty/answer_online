<template>
  <div class="top">
    <div style="text-align: left">
      <a href="javascript:history.back(-1)" style="text-decoration: none;color: #606266;">返回上一页</a>
    </div>
    <span style="font-size: 30px;">注册用户详情</span>
    <el-form ref="registerForm" :model="comment" :rules="rules"  style="margin:40px auto;width: 500px">
      <el-form-item label="ID" prop="name">
        <el-input class="text" placeholder=data.name v-model="comment.com_id" :readonly="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="mail">
        <el-input class="text" placeholder=data.mail v-model="comment.com_content" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="modifyContent(comment.ans_id,comment.ans_content)" style="margin-right: 100px">确定</el-button>
  </div>
</template>

<script>
  import qs from 'qs';
  import {isValidMail} from "../../js/rule";

  export default {
    name: "commentInfo",
    data() {
      return {
        rData:{},
        comment: {
          com_id:'',
          com_content:'',
        },
        rules: {
        },
        Com_id:'',
        Com_content:'',
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
        this.Com_id = this.$route.query.com_id
        this.Com_content = this.$route.query.com_content
        this.id = this.$route.query.user_id
        console.log("传来的com参数=="+this.Com_id)
        console.log("id:",this.id)
      },
      getrData: function () {
        this.comment.com_id = this.Com_id
        this.comment.com_content = this.Com_content
      },
      modifyContent(val1,val2){
        this.$axios.post('http://localhost:8080/online_answer/user/modifyPersonalComment',
          qs.stringify({
            com_id: val1,
            com_content: val2,
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          console.log("修改成功")
        }).catch((error) => {
          console.log(error);
        });
        //this.$router.push({path:'commentList',query:{user_id: this.id}})
        //location.reload()

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
