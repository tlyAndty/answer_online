<template>
  <div class="news">
    <header>
      <router-link to="/" class="gobackLink"><< 返回列表</router-link>
    </header>
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
          ],
        }
      },
      created() {
        this.getnewsinfo();
      },
      methods:{
        getData(id){
          this.axios.get('127.0.0.1/online_answer/user/login&ques_id='+id).then((response)=>{
            console.log(response);
            this.list=response.data.result[0];
            //console.log(response.data.result);
          }).catch((error)=>{
            console.log(error);
          });
        }
      },
      created(){
        this.getData(this.$route.params.id);
      }
    }
</script>

<style scoped>
  .quetsion {
    padding: 0 15px;
  }
</style>
