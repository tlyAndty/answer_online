<template>
  <div class="userInfo" >
      <!--router-link to="/" class="gobackLink"><< 返回列表</router-link-->
    <div class="u_Info_cont" style="color: #666;width: 100%;height:20%;text-align: center;margin-top: 10px">
      <div class="u_info_title" style="margin-right:80px;
                                                           margin-left:80px;
                                                           border: 1px solid #f4f4f4;
                                                           background-color: #fbfdf8">
        <div class="headshot" style="text-align: center;margin-top: 10px">
          <img v-if="userimageUrl" :src="userimageUrl" class="avatar" height="160px" width="160px">
        </div>
        <div class="user_name" style="text-align: center;margin-bottom: 5px;margin-top: 10px;font-size: 16px">
          {{u_info.name}}
        </div>
        <div class="user_capital" style="text-align: center;margin-bottom: 10px;font-size: 16px">
          积分：{{u_info.capital}}
        </div>
      </div>
      <div class="u_info_detail" style="margin-right:80px;margin-left:80px;margin-top:5px;border: 1px solid #f4f4f4;background-color: #fbfdf8">
        <div class="detail_bar" style="">
          <div class="function_choice" style="">
            <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" >
              <el-tab-pane label="提问" name="first" ></el-tab-pane>
              <el-tab-pane label="回答" name="second"></el-tab-pane>
            </el-tabs>
              <!--el-button label="提问" @click="get_q_list()">提问</el-button>
              <el-button label="回答" @click="get_a_list()">回答</el-button-->
          </div>
          <div class="choice_list">
            <div class="q_list" >
              <el-table
              class="questionList"
              :data="qListData"
              style="width: 100%"
              :default-sort = "{prop: 'quesTime', order: 'descending'}"
              v-if="q_flag"
              >

              <el-table-column
                prop="quesTitle"
                label="问题标题"
                header-align="left"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>

              <el-table-column
                prop="quesTime"
                label="发布的最新时间"
                header-align="left"
                align="left"
                :show-overflow-tooltip="true">
              </el-table-column>


              <el-table-column
                prop="quesAnsState"
                label="问题解决状态"
                header-align="left"
                align="left"
                :show-overflow-tooltip="true">
              </el-table-column>

              <el-table-column
                prop="quesState"
                label="问题状态"
                header-align="left"
                align="left"
                :show-overflow-tooltip="true">
              </el-table-column>

            </el-table>
            </div>
            <div class="a_list" >
              <el-table
                class="answerList"
                :data="aListData"
                style="width: 100%"
                :default-sort = "{prop: 'ans_time', order: 'descending'}"
                v-if="a_flag"
              >

                <el-table-column
                  prop="ansContent"
                  label="回答内容"
                  header-align="left"
                  align="left"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>

                <el-table-column
                  prop="ansTime"
                  label="回答发布时间"
                  header-align="left"
                  align="left"
                  :show-overflow-tooltip="true">
                </el-table-column>



                <el-table-column
                  prop="goodCount"
                  label="赞的个数"
                  header-align="left"
                  align="left"
                  :show-overflow-tooltip="true">
                </el-table-column>


                <el-table-column
                  prop="ansState"
                  label="回答的状态"
                  header-align="left"
                  align="left"
                  :show-overflow-tooltip="true">
                </el-table-column>

              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cont" v-html="list.quesContent"></div>
  </div>

</template>

<script>
  import qs from 'qs';

  export default {
    name: "userPage",
    data() {
      return {
        u_info: [],
        list:[

        ],
        id:'',
        radio: '提问',
        q_flag: false,
        a_flag: false,
        qListData: [],
        aListData: [],
        cListData: [],
        activeName: 'first',
        userimageUrl:'',

      }
    },
    created(){
      this.getParams();
      this.getData();
    },
    watch:{
      '$route':'getParams'
    },
    methods:{
      getParams:function () {
        this.id = this.$route.query.user_id
        console.log("传来的参数user_id=="+this.id)
        console.log(this.$store.state.user)
      },
      getData(){
        this.$axios.post('http://localhost:8080/online_answer/user/searchUserInfoByUserId',
          qs.stringify({
            userId: this.id,
          })
        ).then((response) => {
          console.log("response.data.data",response.data.data)
          this.u_info=response.data.data
          this.userimageUrl="http://localhost:8080"+this.u_info.image
          console.log("this.imageUrl:",this.userimageUrl)
          this.getqData()
        }).catch((error) => {
          console.log(error);
        });
        /*this.$axios.post('http://localhost:8080/online_answer/user/searchCommentsByState',
          qs.stringify({
            userId: this.id,
            comState: '0',
          })
        ).then((response) => {
          console.log(response.data.data)
          this.cListData=response.data.data
        }).catch((error) => {
          console.log(error);
        });*/
      },
      getqData(){
        //提问
        this.$axios.post('http://localhost:8080/online_answer/user/searchQuestionsByState',
          qs.stringify({
            userId: this.id,
            quesState: '0',
          })
        ).then((response) => {
          console.log(response.data.data)
          this.qListData=response.data.data
          this.getaData()
        }).catch((error) => {
          console.log(error);
        });
      },
      getaData(){
        //回答
        this.$axios.post('http://localhost:8080/online_answer/user/searchAnswersByState',
          qs.stringify({
            userId: this.id,
            ansState: '0',
          })
        ).then((response) => {
          console.log(response.data.data)
          this.aListData=response.data.data
        }).catch((error) => {
          console.log(error);
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
        if(tab.name == 'first'){
          this.first();
        }else{
          this.second();
        }
      },
      first(){
        this.q_flag= true;
        this.a_flag= false;
        console.log("q_flag的值："+this.q_flag);
      },
      second(){
        this.q_flag= false;
        this.a_flag= true;
        console.log(this.a_flag);
      }
    },

  }
</script>

<style scoped>
  .quetsion {
    padding: 0 15px;
  }
  .el-table{
    background-color: #fbfdf8;
  }
</style>
