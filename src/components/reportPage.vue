<template>
  <div class="questionInfo" style="background: white;padding: 0px">
    <router-link to="/" class="gobackLink"><img id="return" src="../assets/左箭头.png"></router-link>
    <div class="main clearfix" style="margin: 0px;">
      <div class="r_info" style="margin-right: 100px;margin-left: 100px;margin-top: 10px" >
        <div id="report_form" style="background: #fcfcff;border: 1px solid #f0f0f0;">
          <div class="report_form_con" style="overflow: hidden;margin: 20px;position: relative;">
            <el-form ref="reportForm" :model="reportForm" :rules="rules">
              <el-form-item style="margin-bottom: 50px;margin-top: 70px">
                <el-input type="textarea" :rows="8" v-model="reportForm.r_content" placeholder="请输入投诉理由"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="float: right;margin-bottom: 100px" @click.native="onSubmit" >确定提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'

    export default {
      name: "reportPage",
      data(){
        return{
          reportedUserid:'',
          reporttype:'',
          reportTypeId:'',
          reportForm: {
            r_content: '',
          },
          rules: {
            r_content: [
              {required: true, message: '举报理由不能为空', trigger: 'blur'}
            ],
          }
        }
      },
      watch:{
        '$route':'getParams'
      },
      created(){
        this.getParams();
      },
      methods:{
        getParams: function () {
          this.reportedUserid = this.$route.query.reported_userid
          console.log("传来的参数1==" + this.reportedUserid)
          this.reporttype = this.$route.query.report_type
          console.log("传来的参数2==" + this.reporttype)
          this.reportTypeId = this.$route.query.reportTypeId
          console.log("传来的参数3==" + this.reportTypeId)
        },
        onSubmit() {
          console.log("理由：",this.reportForm.r_content)
          if(!this.reportForm.r_content){
            console.log("举报理由不得为空")
            alert("举报理由不得为空")
          } else{
            console.log("this.reportyype",this.reporttype)
            console.log("this.reportedUserid",this.reportedUserid)
            console.log("this.$store.state.user.userId",this.$store.state.user.userId)
            this.$axios.post(
                'http://localhost:8080/online_answer/user/report',
                qs.stringify({
                  reportUserId: this.$store.state.user.userId,
                  reportType: this.reporttype,
                  reportTypeId: this.reportTypeId,
                  reportedUserId: this.reportedUserid,
                  reportContent: this.reportForm.r_content,
                })
              ).then(response => {
                console.log(response)
                console.log("举报结果：",response.data.resultDesc)
                console.log("举报成功")
                alert("举报成功")
                history.go(-1)
              }).catch(error => {
                console.log(error)
              })
          }
        },
      }
    }
</script>

<style scoped>
  #return{
    height:40px;
    width:40px;
    margin:20px 0px 0px 20px;
  }
</style>
