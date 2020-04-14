<template>
  <div class="questionInfo">
    <header>
      <router-link to="/" class="gobackLink"><< 返回列表</router-link>
    </header>
    <h1>hh</h1>
    <h2>{{list.ques_title}}</h2>
    <div class="cont" v-html="list.ques_content"></div>
  </div>

</template>

<script>
    export default {
      name: "question",
      data() {
        return {
          list: [
            {
              ques_id: '1',
              user_id: '1',
              ques_title: 'hhh',
              name:'张三',
              ques_time: '2011',
              ques_content:'奇葩说杨奇函每日一省',
              ques_ans_state: '1',
              ques_state: '2',
            },
          ],
        }
      },
      created(){
        this.getParams();
      },
      watch:{
        '$route':'getParams'
      },
      methods:{
        getParams:function () {
          var id = this.$route.query.q_id
          console.log("传来的参数=="+id)
          this.textareText = id
        },
        getData(id){
          this.axios.get('http://localhost:8080/online_answer/common/viewQuestionInfo',
            {
              params:{
                ques_id:this.id
              }
            })
            .then((response)=>{
              console.log(response);
              this.list=response.data.result[0];
            //console.log(response.data.result);
            })
            .catch((error)=>{
              console.log(error);
            });
        },
      },

    }
</script>

<style scoped>
  .quetsion {
    padding: 0 15px;
  }
</style>
