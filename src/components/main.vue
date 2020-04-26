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
          ques_col_num: '3',
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
            ques_col_num: '0',
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
            ques_col_num: '2',
          }
          ],
        time_order_list:[],
        good_order_list:[],
        sortType: null,                 // 数组对象中的哪一个属性进行排序
        order: false,                   // 升序还是降序
        ques_time: '',
        ques_col_num:'',
      }
    },
    methods: {
      getData() {
        this.$axios.post('http://localhost:8080/online_answer/common/viewQuestionInfo'
        ).then((response) => {
          console.log(response.data.result);
          this.list = response.data.result;
          this.time_order_list = response.data.result;
          this.good_order_list = this.list;
          this.time_order_sort();
          this.good_order_sort();

        }).catch((error) => {
          console.log(error);
        });
      },
      time_order_sort(){
        this.order = false;
        this.sortType = this.time_order_list.ques_time;
        this.time_order_list.time_order_sort(this.compare(this.time_order_list.ques_time));
      },
      good_order_sort(){
        this.order = false;
        this.sortType = this.good_order_list.ques_col_num;
        this.good_order_list.good_order_sort(this.compare(this.good_order_list.ques_col_num));
      },
      /*sort(type){                     // 排序
        this.order = !this.order;		// 更改为 升序或降序
        this.sortType = type;
        this.list.sort(this.compare(type));
        // 调用下面 compare 方法 并传值
      },*/
      compare(attr){                  // 排序方法
        let that = this;
        return function(a,b){
          let val1 = a[attr];
          let val2 = b[attr];

          if(that.order){
            if(that.sortType == 'time'){            // 如果是时间就转换成时间格式
              return new Date(val2.replace(/-/,'/')) - new Date(val1.replace(/-/,'/'));
            }else{
              return val2 - val1;
            }

          }else{
            if(that.sortType == 'time'){
              return new Date(val1.replace(/-/,'/')) - new Date(val2.replace(/-/,'/'));
            }else{
              return val1 - val2;
            }
          }
        }
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
  /*.list_con,.summary_oneline,.list_userbar{
    float: left;
  }*/
</style>
