<template>
  <div class="hometext">
    <h1>主页面</h1>
    欢迎进入探源问答
    <div style="margin: 30px">
      <div class="time_order" style="float: left;width: 50%">
        <ul class="list" v-for="item in list" style="list-style: none;">
          <li >
            <router-link :to="'/question/'+item.ques_id">{{item.ques_title}},{{item.ques_time}}</router-link>
          </li>
        </ul>
        <!--el-table
        class="questionList"
        :data="qListData"
        style="width: 100%"
        :default-sort = "{prop: 'ques_time', order: 'descending'}">

        <el-table-column
         prop="ques_id"
         label="问题id"
         header-align="left"
         align="left"
        >
        </el-table-column>
        <el-table-column
          prop="ques_title"
          label="问题标题"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
         >
        </el-table-column>

        <el-table-column
          prop="ques_time"
          label="发布的最新时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>


        <el-table-column
          prop="ques_ans_state"
          label="问题解决状态"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

      </el-table-->
      </div>

      <div class="good_order" style="float: right;width: 40%">
        <ul class="list" v-for="item in list" style="list-style: none;">
          <li>
            <div class="list_con">
              <div class="title">
                <h2>
                  <a href="'localhost:8088/question/'+item.ques_id">{{item.ques_title}}</a>
                </h2>
              </div>
              <div class="summary_oneline">
                {{item.ques_content}}
              </div>
              <div class="list_userbar">
                <dd class="name"></dd>
              </div>
            </div>
            <router-link :to="'/question/'+item.ques_id">{{item.ques_title}},{{item.ques_time}}</router-link>
          </li>
        </ul>
        <!--el-table
          class="questionList"
          :data="qListData"
          style="width: 100%">
          <el-table-column
           prop="ques_id"
            label="问题id"
            header-align="left"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="ques_title"
            label="问题标题"
            header-align="left"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="ques_time"
            label="发布的最新时间"
            header-align="left"
            align="left"
            :show-overflow-tooltip="true">
          </el-table-column>


          <el-table-column
            prop="ques_ans_state"
            label="问题解决状态"
            header-align="left"
            align="left"
            :show-overflow-tooltip="true">
          </el-table-column>

        </el-table-->
      </div>

    </div>
  </div>
</template>

<script>
  import Axios from 'axios';
  export default {
    name: 'mainpage',
    data() {
      return {
        list:[{
          ques_id: '1',
          ques_title: 'hhh',
          ques_time: '2011',
          ques_ans_state: '1',
          ques_state: '2',
        },
          {
            ques_id: '2',
            ques_title: 'yyy',
            ques_time: '2016',
            ques_ans_state: '1',
            ques_state: '2',
          },
          {
            ques_id: '3',
            ques_title: 'ttt',
            ques_time: '2014',
            ques_ans_state: '1',
            ques_state: '2',
          }]
      }
    },
    methods: {
      getData() {
        this.$axios.get('127.0.0.1/online_answer/user/login'
        ).then((response) => {
          this.list = response.data.result;
          //console.log(response.data.result);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
   created(){
      this.getData();
    }
  }
</script>

<style>
  .el-button{
    background-color: lightcoral;
    color: white;
  }
  .hometext{
    text-align:center;
  }
</style>
