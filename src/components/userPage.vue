<template>
  <div class="userInfo" >
      <router-link to="/" class="gobackLink"><< 返回列表</router-link>
    <div class="u_Info_cont" style="width: 100%;height:20%;text-align: center;">
      <div class="u_info_title" v-for="u in u_info" style="margin-right:80px;
                                                           margin-left:80px;
                                                           border: 1px solid #f4f4f4;
                                                           background-color: #fbfdf8">
        <div class="headshot" style="text-align: center;margin-top: 10px">
          <img src="../assets/headshot.png" style="width: auto;height: auto;max-width: 100px;max-height: 100px">
        </div>
        <div class="user_name" style="text-align: center;margin-bottom: 5px">
          {{u.name}}
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
                  prop="ans_content"
                  label="回答内容"
                  header-align="left"
                  align="left"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>

                <el-table-column
                  prop="ans_time"
                  label="回答发布时间"
                  header-align="left"
                  align="left"
                  :show-overflow-tooltip="true">
                </el-table-column>



                <el-table-column
                  prop="good_count"
                  label="赞的个数"
                  header-align="left"
                  align="left"
                  :show-overflow-tooltip="true">
                </el-table-column>


                <el-table-column
                  prop="ans_state"
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
  export default {
    name: "userPage",
    data() {
      return {
        u_info: [
          {
            mail:'1@qq.com',
            name:'李四',
          },
        ],
        list:[

        ],
        radio: '提问',
        q_flag: false,
        a_flag: false,
        qListData: [{
          quesId: '1',
          quesTitle: 'hhh',
          quesTime: '2011',
          quesAnsState: '1',
          quesState: '2',
        },
          {
            quesId: '2',
            quesTitle: 'yyy',
            quesTime: '2016',
            quesAnsState: '1',
            quesState: '2',
          },
          {
            quesId: '3',
            quesTitle: 'ttt',
            quesTime: '2014',
            quesAnsState: '1',
            quesState: '2',
          }],
        aListData: [{
          ans_id:'1',
          ans_content:'内容a',
          ans_time:'2020-03-27 13:07:40',
          good_count:'1',
          bad_count:'2',
          ans_state:'0',
        },
          {
            ans_id:'2',
            ans_content:'内容g',
            ans_time:'2020-03-24 13:07:40',
            good_count:'1',
            bad_count:'2',
            ans_state:'0',
          },
          {
            ans_id:'3',
            ans_content:'内容w',
            ans_time:'2020-03-21 13:07:40',
            good_count:'1',
            bad_count:'2',
            ans_state:'0',
          }],
        activeName: 'first'
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
        this.axios.get('http://localhost:8080/online_answer/user/displayPersonalCollections',
          {
            params:{
              userId:this.id
            }
          })
          .then((response)=>{
            console.log(response);
            this.u_info=response.data.result;
            //console.log(response.data.result);
          })
          .catch((error)=>{
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
