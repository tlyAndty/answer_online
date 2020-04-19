<template>
  <div class="userInfo" >
      <router-link to="/" class="gobackLink"><< 返回列表</router-link>
    <div class="u_Info_cont" >
      <div class="u_info_title" v-for="u in u_info" style="border: 1px solid #fbfdf8;">
        <div class="headshot" style="float: left">
          头像图片
        </div>
        <div class="user_name" style="float:left">
          {{u.name}}
        </div>
      </div>
      <div class="u_info_detail" style="border: 1px solid #f4f4f4;">
        <div class="detail_bar">
          问题在这里
          <a class="u_ques"></a>
        </div>
      </div>
    </div>
    <div class="cont" v-html="list.ques_content"></div>
  </div>

</template>

<script>
  export default {
    name: "userPage",
    data() {
      return {
        u_info: [
          {
            mail:'1@qq.com',
            name:'u1',
          },
        ],
        list:[

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
        this.axios.get('http://localhost:8080/online_answer/common/viewQuestionInfo',
          {
            params:{
              user_id:this.id
            }
          })
          .then((response)=>{
            console.log(response);
            this.u_info=response.data.result[0];
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
