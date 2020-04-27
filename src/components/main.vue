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
        <ul class="list" v-for="item in time_order_list" style="margin:0px;list-style: none;">
          <li style="background-color: #fbfdf8;position: relative;padding: 18px 24px 13px 24px;border-bottom: 1px solid #f4f4f4;">
            <div class="list_con" style="text-align: left">
              <div class="title">
                <router-link style="font-size: 30px;color: #333333;text-decoration:none" :to="{name:'questionPage',query:{q_id:item.quesId}}">{{item.quesTitle}}</router-link>
              </div>
              <div class="summary_oneline" style="margin-bottom: 4px;color: #8a8a8a;font-size: 14px;line-height: 24px;">
                <router-link style style="color: #8a8a8a;text-decoration:none" :to="{name:'questionPage',query:{q_id:item.quesId}}">{{item.quesContent}}</router-link>
              </div>
              <div class="list_userbar" style="height: 24px;line-height: 24px;font-size: 14px;color: #8a8a8a;">
                <div class="name" style="float: left">
                  <router-link  style="color: #8a8a8a;text-decoration:none" :to="{name:'userPage',query:{u_id:item.userId}}">{{item.name}}</router-link>
                </div>
                <div class="time" style="float: right">
                  <span>{{item.quesTime| dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
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
        <ul class="list" v-for="item in good_order_list" style="margin:0px;list-style: none;">
          <li style="background-color:#fbfdf8;position: relative;padding: 18px 24px 13px 24px;border-bottom: 1px solid #f4f4f4;">
            <div class="list_con" style="text-align: left">
              <div class="title">
                <router-link  style="font-size: 20px;color: #333333;text-decoration:none" :to="{name:'questionPage',query:{q_id:item.quesId}}">{{item.quesTitle}}</router-link>
              </div>
              <div class="summary_oneline" style="margin-bottom: 4px;line-height: 24px;">
                <router-link  style="color: #8a8a8a;font-size: 12px;text-decoration:none" :to="{name:'questionPage',query:{q_id:item.quesId}}">{{item.quesContent}}</router-link>
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
  import qs from 'qs';
  export default {
    name: 'mainpage',
    data() {
      return {
        list:[/*{
          quesId: '1',
          userId: '1',
          quesTitle: 'hhh',
          name:'张三',
          quesTime: '2011',
          quesContent:'奇葩说杨奇函每日一省',
          quesAnsAtate: '1',
          quesState: '2',
          ques_col_num: '3',
        },
          {
            quesId: '2',
            userId: '3',
            quesTitle: 'yyy',
            name:'李四',
            quesTime: '2016',
            quesContent:'奇葩说杨奇函每日两省',
            quesAnsState: '1',
            quesState: '2',
            ques_col_num: '0',
          },
          {
            quesId: '3',
            userId: '9',
            quesTitle: 'ttt',
            name:'王五',
            quesTime: '2014',
            quesContent:'奇葩说杨奇函每日三省',
            quesAnsState: '1',
            quesState: '2',
            ques_col_num: '2',
          }*/
        ],
        sortType: null,                 // 数组对象中的哪一个属性进行排序
        order: false,                   // 升序还是降序
      }
    },
    methods: {
      getData() {
        this.$axios.post('http://localhost:8080/online_answer/admin/searchQuestionsByState',
         // {
         //   params: {
         //     quesState: '3',
         //   }
         // }
          qs.stringify({
            quesState: '3',
          })
        ).then((response) => {
          console.log(response.data.data);
          this.list = response.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      sortByTime(array,key){
        return array.sort(function(a,b){
          var x = a[key];
          var y = b[key];
          return ((y<x)?-1:(x>y)?1:0)   //从小到大排序
        })
      },
      sortByGood(array,key){
        return array.sort(function(b,a){
          var x = a[key];
          var y = b[key];
          return ((y<x)?-1:(x>y)?1:0)   //从小到大排序
        })
      }

    },
    created(){
      this.getData();
    },
    computed:{
      time_order_list:function(){
        return this.sortByTime(this.list,'quesTime')
      },
      good_order_list:function(){
        return this.sortByGood(this.list,'quesColNum')
      }
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
