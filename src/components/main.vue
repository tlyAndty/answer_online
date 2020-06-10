<template>
  <div class="hometext" style="margin: 0px">
    <a href="javascript:history.back(-1)" style="text-decoration: none;color: #606266;"><img id="return" src="../assets/左箭头.png"></a>
    <div class="maintext" style="margin: 0px">
      <div class="main" style="float: left;width: 70%;margin-top: 0px">
      <p>
        <span style="font-size: 30px;">欢迎进入探源问答</span>
      </p>
      <div style="padding-inline-start: 40px;">
        <a style="width:100%;display: block;position: relative;background-color: lightcoral; color: #fff;">最新内容</a>
      </div>
      <div class="time_order">
        <ul class="list"  style="margin:0px;list-style: none;">
          <li  v-for="item in time_order_list.slice(0,5)" v-if="item.question.quesState==0 || item.question.userId==id || admin" style="background-color: #fbfdf8;position: relative;padding: 18px 24px 13px 24px;border-bottom: 1px solid #f4f4f4;">
            <div class="list_con" style="text-align: left;">
              <div class="list_title" style="margin-bottom: 10px;">
                <router-link style="font-size: 30px;color: #333333;text-decoration:none;text-shadow: none" :to="{name:'questionPage',query:{ques_id:item.question.quesId}}">{{item.question.quesTitle}}</router-link>
              </div>
              <div class="summary_oneline" style="margin-bottom: 4px;color: #8a8a8a;font-size: 14px;line-height: 24px;">
                <router-link style="color: #8a8a8a;text-decoration:none" :to="{name:'questionPage',query:{ques_id:item.question.quesId}}">{{item.question.quesContent}}</router-link>
              </div>
              <div class="list_userbar" style="line-height: 24px;font-size: 14px;color: #8a8a8a;height: 24px">
                <div class="name" style="float: left">
                  <router-link  style="color: #8a8a8a;text-decoration:none" :to="{name:'userPage',query:{user_id:item.question.userId}}">{{item.user_name}}</router-link>
                </div>
                <div class="reward" style="float: left;margin-left: 20px">
                  <span>悬赏积分：{{item.question.quesReward}}</span>
                </div>
                <div v-if="!admin" class="report" style="float: left;margin-left: 20px;">
                  <a class="reportQues" @click="reportQues(item.question.userId)">
                    举报此问题
                  </a>
                </div>
                <div class="state" v-if="item.question.quesState!=0" style="float: left;margin-left: 20px;color: lightcoral">
                  <span>[已被屏蔽]</span>
                </div>
                <div class="time" style="float: right">
                  <span>{{item.question.quesTime| dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>
                <div class="function_bar" style="float: right;margin-right: 20px">
                  <a v-if="admin && item.question.quesState==0" class="blo_question" style="color: lightcoral;margin-left: 20px" @click="blockQuestion(item.question.quesId)">
                    屏蔽
                  </a>
                  <!--a v-if="admin" class="del_question" style="color: lightcoral;margin-left: 20px" @click="deleteQuestion(item.otherImportantPages.quesId)">
                    删除
                  </a-->
                </div>
              </div>
            </div>
            <!--router-link :to="'/otherImportantPages/'+item.ques_id">{{item.ques_title}},{{item.ques_time}}</router-link-->
          </li>
        </ul>
      </div>
    </div>
      <div class="aside" style="float: right;width: 30%;margin-top: 0px">
      <div class="good_order" >
        <h3>
          <span class="line"></span>
          <span class="txt">最热推荐</span>
        </h3>
        <ul class="list"  style="margin:0px;list-style: none;">
          <li v-for="item in good_order_list.slice(0,5)" v-if="item.question.quesState==0||item.question.userId==id || admin" style="background-color:#fbfdf8;position: relative;padding: 18px 24px 13px 24px;border-bottom: 1px solid #f4f4f4;">
            <div class="list_con" style="text-align: left">
              <div class="list_title" >
                <router-link  style="font-size: 20px;color: #333333;text-decoration:none;text-shadow: none" :to="{name:'questionPage',query:{ques_id:item.question.quesId}}">{{item.question.quesTitle}}</router-link>
              </div>
              <div class="summary_oneline" style="margin-bottom: 4px;line-height: 24px;">
                <router-link  style="color: #8a8a8a;font-size: 12px;text-decoration:none" :to="{name:'questionPage',query:{ques_id:item.question.quesId}}">{{item.question.quesContent}}</router-link>
              </div>
              <div class="colNum" style="color: #8a8a8a;font-size: 12px;height: 15px">
                <span style="float: left">收藏数：{{item.question.quesColNum}}</span>
                <div class="function_bar" style="float: right;margin-right: 20px;font-size: 12px;">
                  <a v-if="admin && item.question.quesState==0" class="blo_question" style="color: lightcoral;margin-left: 20px" @click="blockQuestion(item.question.quesId)">
                    屏蔽
                  </a>
                  <!--a v-if="admin" class="del_question" style="color: lightcoral;margin-left: 20px" @click="deleteQuestion(item.otherImportantPages.quesId)">
                    删除
                  </a-->
                </div>
                <div v-if="!admin" class="report" style="float: left;margin-left: 20px;">
                  <a class="reportQues" @click="reportQues(item.question.userId)">
                    举报此问题
                  </a>
                </div>
              </div>
              <div class="state" v-if="item.question.quesState!=0" style="font-size: 12px;color: lightcoral">
                <span>[已被屏蔽]</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="adiseFooter" style="margin-top: 15px;padding-left: 40px">
        <div class="info_box" style="padding: 16px;background-color:#fbfdf8;font-size: 14px">
          <div class="contact-info" style="padding-bottom: 3px;line-height: 20px;font-size: 12px;">
            <p style="margin-bottom:10px;color: #8a8a8a;text-align: left;">
              <a href="/adminlogin" style="color: #8a8a8a;text-decoration:none">
              <span>管理员登录</span>
              </a>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <span style="">
                tywd@tly&ty.net
              </span>
            </p>
            <p style="margin-bottom:10px;color: #8a8a8a;text-align: left;">
              <span style="">
                投诉与建议
              </span>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <span>400-666-8888</span>
            </p>
            <p style="color: #8a8a8a;text-align: left;">
              <span>工作时间：9:30-22:00</span>
            </p>
          </div>
          <div class="bg-gray" >
            <div class="feed_copy" style="color: #8a8a8a;
                                          text-align: left;
                                          font-size: 12px;
                                          border-top: 1px solid #F3F3F3;
                                          padding-top: 1px;
                                          border-bottom: 1px solid #F3F3F3;
                                          padding-bottom: 1px;
                                          margin-bottom: 1px;">
              <p>
                <span>关于我们</span>
                <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                <span>招聘</span>
                <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                <span>广告服务</span>
                <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                <span>网站地图</span>
              </p>
            </div>
          </div>
          <div class="allow_info_box" style="color: #8a8a8a;
                                          text-align: left;
                                          font-size: 12px;">
            <p>
              <span>京ICP备19004658号</span>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <span>经营性网站备案信息</span>
            </p>
            <p>
              <span>公安备案号 11010502030143</span>
            </p>
            <p>
              <span>京网文〔2020〕1039-165号</span>
            </p>
            <p>
              <span>©2020-3020 中国谈腊云和田园网络技术有限公司</span>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <span>网络110报警服务</span>
            </p>
            <p>
              <span>中国互联网违法和不良信息举报中心</span>
            </p>
            <p>
              <span>中国互联网举报中心</span>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <span>家长监护</span>
            </p>
            <p>
              <span>版权与免责声明</span>
              <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
              <span>版权申诉</span>
            </p>
          </div>
        </div>
      </div>
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
        list:[],
        time_order_list:[],
        good_order_list:[],
        sortType: null,                 // 数组对象中的哪一个属性进行排序
        order: false,                   // 升序还是降序
        list_length:'',
        id:'',
      }
    },
    watch:{
      '$route':'getParams'
    },
    created(){
      this.getParams();
      this.getData();
    },
    computed:{
      user () {
        return this.$store.state.user
      },
      admin() {
        return this.$store.state.admin
      }
    },
    methods: {
      getParams:function () {
        console.log("user:",this.$store.state.user)
        console.log("admin:",this.$store.state.admin)
        if(this.$store.state.user!=null){
          this.id = this.$store.state.user.userId
          console.log("传来的参数=="+this.id)
        }
      },
      getData() {
        //时间排序
        this.$axios.post('http://localhost:8080/online_answer/admin/searchQuestionsByState',
          qs.stringify({
            quesState: '3',
          })
        ).then((response) => {
          //console.log("firstlist:",response.data.data);
          this.time_order_list = response.data.data;
          console.log("time_order_list:",this.time_order_list)
        }).catch((error) => {
          console.log(error);
        });
        //收藏排序
        this.$axios.post('http://localhost:8080/online_answer/common/selectAllByColNum'
        ).then((response) => {
          //console.log("firstlist:",response.data.data);
          this.good_order_list = response.data.data;
          console.log("good_order_list:",this.good_order_list)
        }).catch((error) => {
          console.log(error);
        });
      },
      sortByTime(array,key){
        return array.sort(function(a,b){
          var x = a[key];
          console.log("key:",x)
          var y = b[key];
          return ((y<x)?-1:(x>y)?1:0)   //从小到大排序
        })
      },
      sortByGood(array,key){
        return array.sort(function(b,a){
          var x = a[key];
          var y = b[key];
          return ((y<x)?-1:(x>y)?1:0)   //从大到小排序
        })
      },
      deleteQuestion(quesid){
        this.$axios.post(
          'http://localhost:8080/online_answer/user/deletePersonalQuestion',
          qs.stringify({
            quesId: quesid,
          })
        ).then(response => {
          console.log(response.data)
          alert(response.data.resultDesc)
          console.log("删除问题成功")
          history.go(0)
        }).catch(error => {
          console.log(error)
        })
      },
      blockQuestion(quesid){
        this.$axios.post(
          'http://localhost:8080/online_answer/admin/modifyQuestionState',
          qs.stringify({
            quesId: quesid,
            quesState: '1'
          })
        ).then(response => {
          console.log(response.data)
          alert(response.data.resultDesc)
          console.log("屏蔽问题成功")
          history.go(0)
        }).catch(error => {
          console.log(error)
        })
      },
      reportQues(reportedUserid){
        if (this.$store.state.user){
          this.$router.push({path:'/reportPage',query:{reported_userid:reportedUserid,report_type:'1'}})
        } else{
          this.$router.push('/userlogin')
        }
          //alert("举报了")
      },
    },

  }
</script>

<style>
  .el-button{
    background-color: lightcoral;
    color: white;
  }
  .maintext{
    text-align:center;
  }
  #return{
    height:40px;
    width:40px;
    margin:20px 0px 0px 20px;
  }
</style>
