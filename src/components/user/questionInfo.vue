<template>
    <div class="top">
      <div style="text-align: left">
        <a href="javascript:history.back(-1)" style="text-decoration: none;color: #606266;"><img id="return" src="../../assets/左箭头.png"></a>
      </div>
      <span style="font-size: 30px;">问题详情</span>
      <el-form ref="questionForm" :model="questionForm" :rules="rules"  style="margin:40px auto;width: 500px">
        <el-form-item label="标题" prop="title">
          <el-input type="text" placeholder=data.title v-model="questionForm.a_title" :readonly="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" placeholder=data.content v-model="questionForm.a_content" :readonly="true" autocomplete="off" :autosize="{minRows:1,maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item label="悬赏积分" prop="reward">
          <el-input type="text" placeholder=data.reward v-model="questionForm.a_reward" :readonly="true" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import qs from 'qs';
    export default {
        name: "questionInfo",
        data(){
          return{
            questionForm:{
              a_title: '',
              a_content:'',
              a_reward:'',
            },
            rules:{
            },
            id:'',
          }
        },
      created() {
        this.getParams()
        this.getqData()
      },
      watch:{
        '$route':'getParams'
      },
      methods:{
        getParams:function () {
          this.id = this.$route.query.ques_id
          console.log("id:",this.id)
        },
        getqData: function () {
          this.$axios.post('http://localhost:8080/online_answer/common/viewQuestionInfo',
            qs.stringify({
              quesId: this.id,
            })
          ).then((response) => {
            console.log("qData:",response.data.data);
            this.qData = response.data.data;
            this.questionForm.a_title = this.qData.quesTitle
            this.questionForm.a_content = this.qData.quesContent
            this.questionForm.a_reward = this.qData.quesReward
            console.log("qname",this.qData.quesTitle)
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
  #return{
    height:40px;
    width:40px;
    margin:20px 0px 0px 20px;
  }
</style>
