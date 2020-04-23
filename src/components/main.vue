<template>
  <div class="hometext" style="margin-top: 20px">

    <div class="main" style="float: left;width: 70%;">
      <p>
        <span style="font-size: 30px;">欢迎进入探源问答</span>
      </p>
      <div style="padding-inline-start: 40px;">
        <a style="width:100%;display: block;position: relative;background-color: lightcoral; color: #fff;">最新内容</a>
      </div>
      <div class="time_order">
        <ul class="list" v-for="item in list" style="margin:0px;list-style: none;">
          <li style="background-color: #fbfdf8;position: relative;padding: 18px 24px 13px 24px;border-bottom: 1px solid #f4f4f4;">
            <div class="list_con" style="text-align: left">
              <div class="title">
                <router-link style="font-size: 30px;color: #333333;text-decoration:none" :to="{name:'questionPage',query:{q_id:item.ques_id}}">{{item.ques_title}}</router-link>
              </div>
              <div class="summary_oneline" style="margin-bottom: 4px;color: #8a8a8a;font-size: 14px;line-height: 24px;">
                <router-link style style="color: #8a8a8a;text-decoration:none" :to="{name:'questionPage',query:{q_id:item.ques_id}}">{{item.ques_content}}</router-link>
              </div>
              <div class="list_userbar" style="height: 24px;line-height: 24px;font-size: 14px;color: #8a8a8a;">
                <div class="name" style="float: left">
                  <router-link  style="color: #8a8a8a;text-decoration:none" :to="{name:'userPage',query:{u_id:item.user_id}}">{{item.name}}</router-link>
                </div>
                <div class="time" style="float: right">
                  <span>{{item.ques_time}}</span>
                </div>
              </div>
            </div>
            <!--router-link :to="'/question/'+item.ques_id">{{item.ques_title}},{{item.ques_time}}</router-link-->
          </li>
        </ul>
      </div>
    </div>

    <div class="aside" style="float: right;width: 30%">
      <div class="good_order" style="">
        <h3>
          <span class="line"></span>
          <span class="txt">最热推荐</span>
        </h3>
        <ul class="list" v-for="item in list" style="margin:0px;list-style: none;">
          <li style="background-color:#fbfdf8;position: relative;padding: 18px 24px 13px 24px;border-bottom: 1px solid #f4f4f4;">
            <div class="list_con" style="text-align: left">
              <div class="title">
                <router-link  style="font-size: 20px;color: #333333;text-decoration:none" :to="{name:'questionPage',query:{q_id:item.ques_id}}">{{item.ques_title}}</router-link>
              </div>
              <div class="summary_oneline" style="margin-bottom: 4px;line-height: 24px;">
                <router-link  style="color: #8a8a8a;font-size: 12px;text-decoration:none" :to="{name:'questionPage',query:{q_id:item.ques_id}}">{{item.ques_content}}</router-link>
              </div>
            </div>
          </li>
        </ul>
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
          user_id: '1',
          ques_title: 'hhh',
          name:'张三',
          ques_time: '2011',
          ques_content:'奇葩说杨奇函每日一省',
          ques_ans_state: '1',
          ques_state: '2',
          },
          {
            ques_id: '2',
            user_id: '3',
            ques_title: 'yyy',
            name:'李四',
            ques_time: '2016',
            ques_content:'奇葩说杨奇函每日两省',
            ques_ans_state: '1',
            ques_state: '2',
          },
          {
            ques_id: '3',
            user_id: '9',
            ques_title: 'ttt',
            name:'王五',
            ques_time: '2014',
            ques_content:'奇葩说杨奇函每日三省',
            ques_ans_state: '1',
            ques_state: '2',
          }
          ],
      }
    },
    methods: {
      getData() {
        this.$axios.get('http://localhost:8080/online_answer/common/viewQuestionInfo'
        ).then((response) => {
          this.list = response.data.result;
          //console.log(response.data.result);
        }).catch((error) => {
          console.log(error);
        });
      },
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
  /*.list_con,.summary_oneline,.list_userbar{
    float: left;
  }*/
</style>
