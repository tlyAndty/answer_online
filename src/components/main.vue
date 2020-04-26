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
  export default {
    name: 'mainpage',
    data() {
      return {
        list:[{
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
          }
          ],
        time_order_list:[],
        good_order_list:[],
        sortType: null,                 // 数组对象中的哪一个属性进行排序
        order: false,                   // 升序还是降序
        quesTime: '',
        ques_col_num:'',
      }
    },
    methods: {
      getData() {
        this.$axios.post('http://localhost:8080/online_answer/admin/searchQuestionsByState',
          {
            params: {
              quesState: '3',
            }
          }
        ).then((response) => {
          console.log(response.data);
          this.list = response.data;
          this.time_order_list = this.list;
          this.good_order_list = this.list;
          this.time_order_sort();
          this.good_order_sort();

        }).catch((error) => {
          console.log(error);
        });
      },
      time_order_sort(){
        this.order = false;
        this.sortType = this.time_order_list.quesTime;
        this.time_order_list.time_order_sort(this.compare(this.time_order_list.quesTime));
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
