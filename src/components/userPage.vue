<template>
  <div class="userInfo">
    <header>
      <router-link to="/" class="gobackLink"><< 返回列表</router-link>
    </header>
    <h1>uuu</h1>
    <h2>{{list.ques_title}}</h2>
    <div class="cont" v-html="list.ques_content"></div>
  </div>

</template>

<script>
  export default {
    name: "userPage",
    data() {
      return {
        list: [
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
        var id = this.$route.query.u_id
        console.log("传来的参数=="+id)
        this.textareText = id
      },
      getData(id){
        this.axios.get('127.0.0.1/online_answer/user/login')
          .then((response)=>{
            console.log(response);
            this.list=response.data.result[0];
            //console.log(response.data.result);
          }).catch((error)=>{
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
