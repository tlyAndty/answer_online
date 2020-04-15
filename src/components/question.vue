<template>
  <div class="questionInfo">
    <router-link to="/" class="gobackLink"><< 返回列表</router-link>
    <div class="main clearfix">
      <div class="q_info" v-for="q in list" style="float: left;width: 70%;margin: 20px 20px; ">
          <div class="common_con clearfix" style="margin-top: 1px;border: 2px solid #fbfdf8;">
            <div class="q_title" style="width:850px;font-size: 22px;color: #333;margin-bottom:15px;margin-top: 10px ">{{q.ques_title}}</div>
            <div class="q_cont" style="width:850px;font-size: 14px;color: #666;margin-top: -5px;line-height: 24px">{{q.ques_content}}</div>
            <div class="q_time" style="width:850px;font-size: 12px;color: #999;vert-align: middle;margin-bottom: 0px;line-height: 20px;padding:16px 0 10px ">编辑于：{{q.ques_time}}</div>
            <div class="tags" style="width:850px">
              <a href="question">vue.js</a>
              <a href="question">ajax</a>
              <a href="question">mysql</a>
            </div>
            <div class="share_bar_con" style="color: #999;width:850px;font-size: 12px;clear: both;margin: 10px 20px 10px 0;background: none;height: 30px;">
              <a class="bds_more" style="line-height:30px;padding-left:0;margin: 0px;background:none;text-decoration:none;color: #999;" href="javascript:;"  data-cmd="more">分享</a>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <a class="collection" style="color: #999;text-decoration:none" onclick="window.csdn.loginBox.show()" href="javascript:;">评论0</a>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <a class="collection" style="color: #999;text-decoration:none" data-bind-login="true" onclick="window.csdn.loginBox.show()" href="javascript:;" rel="nofollow" title="收藏">
                收藏
              </a>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <a class="collection" style="text-decoration:none;color: #999;" href="javascript:;">浏览342</a>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <i class="el-icon-thumb"></i>
              <em>0</em>

              <!--i class="el-icon-share"></i>
              <span class="interval">|</span>
              <i class="el-icon-s-comment"></i-->
            </div>
          </div>
          <div class="common_con clearfix" style="margin-top: 1px;border: 1px solid #fbfdf8;">
            <div class="answer_sort_con  q_operate" style="height: 50px;:middle">
              <p style="font-size: 16px;height: 50px;line-height: 50px;float: left;margin-left: 20px;color: #333;">1个回答</p>

                <el-dropdown style="float: right;margin-right: 20px;top:50%;position: relative;">
                  <span class="el-dropdown-link">
                    按赞数排序<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>时间排序</el-dropdown-item>
                    <el-dropdown-item>评论数排序</el-dropdown-item>
                    <el-dropdown-item disabled>按赞数排序</el-dropdown-item>

                  </el-dropdown-menu>
                </el-dropdown>

              </div>
            </div>
            <div class="answer_list">
              <div class="answer_detail_con">
                <div style="margin: 0 20px 10px;font-size: 14px;color: #666;line-height: 24px;word-break: break-all;word-wrap: break-word;">
                  <p>评论内容</p>
                </div>
              </div>
            </div>
            <div id="author_answer_form"></div>
          </div>
      <div class="user_info" v-for="q in list" style="float: right; width: 20%">
      个人信息
    </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "question",
      data() {
        return {
          list: [
            {
              ques_id: '1',
              user_id: '1',
              ques_title: 'hhh',
              name:'张三',
              ques_time: '2011',
              ques_content:'奇葩说杨奇函每日一省',
              ques_ans_state: '1',
              ques_state: '2',
            },
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
          var id = this.$route.query.q_id
          console.log("传来的参数=="+id)
          this.textareText = id
        },
        getData(id){
          this.axios.get('http://localhost:8080/online_answer/common/viewQuestionInfo',
            {
              params:{
                ques_id:this.id
              }
            })
            .then((response)=>{
              console.log(response);
              this.list=response.data.result[0];
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
  .questionInfo {
    padding: 0 15px;
    background-color: #fbfdf8;
  }
  .tags a{
    border-radius: 50px;
    display: block;
    float: left;
    line-height: 14px;
    margin: 10px 10px 10px 0;
    padding: 6px 8px;
    color: #4d4d4d;
    font-size: 12px;
    border: 1px solid #CCCCCC;
  }
</style>
