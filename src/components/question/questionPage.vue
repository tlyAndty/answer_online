<template>
  <div class="questionInfo" style="background: white;padding: 0px">
    <a href="javascript:history.back(-1)" style="text-decoration: none;color: #606266;">返回上一页</a>
    <!--router-link to="/" class="gobackLink"><< 返回列表</router--->
    <div class="main clearfix" style="margin: 0px;">
      <div class="q_info" style="margin-right: 100px;margin-left: 100px;margin-top: 10px" >
          <div class="common_con clearfix" style="margin-top: 1px;background: #fcfcff;border: 1px solid #f0f0f0;">
            <div class="question_detail_con" style="margin: 20px 20px 0;position: relative;padding: 0px">
              <div class="q_title" style="width:850px;font-size: 22px;color: #333;margin-bottom:15px;margin-top: 10px ">{{this.quesTitle}}</div>
              <div class="q_cont" style="width:850px;font-size: 14px;color: #666;margin-top: -5px;line-height: 24px">{{this.quesContent}}</div>
              <div class="q_time" style="width:850px;font-size: 12px;color: #999;vert-align: middle;margin-bottom: 0px;line-height: 20px;padding:16px 0 10px ">
                <div class="q_userName" style="float: left">
                  {{this.quesUserName}}
                </div>
                <div class="reward" style="float: left;margin-left: 20px">
                  <span>悬赏积分：{{this.quesReward}}</span>
                </div>
                <div class="state" v-if="this.quesState!=0" style="float: left;margin-left: 20px;color: lightcoral">
                  <div v-if="this.quesUserId==userId">
                    <span>[已被屏蔽]</span>
                  </div>
                </div>
                <p style="margin: 0;"></p>
              </div>
              <div class="q_time" style="width:850px;font-size: 12px;color: #999;vert-align: middle;margin-bottom: 0px;line-height: 20px;padding:16px 0 10px ">
                编辑于：{{this.quesTime| dateFmt('YYYY-MM-DD HH:mm:ss')}}
              </div>
              <!--div class="tags" style="width:850px">
                <a href="">vue.js</a>
                <a href="">ajax</a>
                <a href="">mysql</a>
              </div-->
              <div class="q_share_bar_con" style="color: #999;width:850px;font-size: 12px;clear: both;margin-top:10px;margin-bottom:10px;background: none;height: 30px;">
                <a class="bds_more" style="line-height:30px;padding-left:0;margin: 0px;background:none;text-decoration:none;color: #999;" href="javascript:;"  data-cmd="more">分享</a>
                <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                <a class="collection" style="color: #999;text-decoration:none" data-bind-login="true" onclick="window.csdn.loginBox.show()" href="javascript:;" rel="nofollow" title="收藏">
                  收藏{{this.quesColNum}}
                </a>
                <!--span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                <i class="el-icon-thumb"></i>
                <em>0</em-->
              </div>
            </div>
          </div>
          <div class="common_con clearfix" style="margin-top: 1px;background: #fcfcff;">
            <div class="answer_sort_con  q_operate" style="height: 50px;line-height: 50px;border: 1px solid #f0f0f0;">
              <p style="margin-bottom: 0px;margin-top: 0px;margin-right:0px;margin-left: 20px;font-size: 16px;height: 50px;line-height: 50px;float: left;color: #333;">1个回答</p>
              <div class="sort_style_operate_style" style="float: right;margin-right: 20px;height: 50px;line-height: 50px;position: relative;">
                <el-dropdown style="height: 50px;line-height: 50px;font-size: 14px;color: #666;cursor: pointer;">
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
            </div>
            <div class="answer_list" style="background: #fcfcff;">
              <div class="answer_detail_con" style="position: relative;min-height: 190px;border: 1px solid #f0f0f0;padding-top: 16px;">
                <div style="margin: 0;font-size: 14px;color: #666;line-height: 24px;word-break: break-all;word-wrap: break-word;">
                  <ul class="answerlist" v-for="item in answerlist" style="margin:0px;list-style: none;padding:0;">
                    <li style="background-color:#fbfdf8;position: relative;padding: 18px 24px 13px 24px;border-bottom: 1px solid #f4f4f4;">
                      <div class="list_con" style="text-align: left">
                        <div class="ans_content">
                          {{item.ansContent}}
                        </div>
                        <div class="ans_time ans_userName" style="font-size: 12px;color: #999;margin-bottom: 4px;line-height: 24px;padding: 10px 0 2px">
                          {{item.userId}}
                          {{getUserName(item.userId)}}
                          <p style="margin: 0">发布于：{{item.ansTime}}</p>
                        </div>
                        <div class="a_share_bar_con" style="color: #999;width:850px;font-size: 12px;background: none;margin: 10px 20px 10px 0;height: 30px">
                          <a class="collection" style="color: #999;text-decoration:none" onclick="window.csdn.loginBox.show()" href="javascript:;">评论0</a>
                          <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                          <i class="el-icon-thumb"></i>
                          <!--em>0</em-->
                          {{item.goodCount}}
                          <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                          <span style="color: #999;text-decoration:none"> state:{{item.ansState}}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <!--div class="ask_date" style="margin: 0 20px;padding: 16px 0 10px;">
                  <div class="ask_edit_wrap" style="position: relative;font-weight: normal;margin-bottom: 0;cursor: pointer;">
                    <span style="display: inline-block;vertical-align: middle;font-size: 12px;color: #999;margin-right: 45px;">时间</span>
                  </div>
                </div-->
              </div>
              <!--div class="answer_detail_con" style="position: relative;min-height: 190px;border: 1px solid #fbfdf8;padding-top: 16px;">
                <div style="margin: 0 20px 10px;font-size: 14px;color: #666;line-height: 24px;word-break: break-all;word-wrap: break-word;">
                  <p>评论内容</p>
                </div>
                <div class="ask_date" style="margin: 0 20px;padding: 16px 0 10px;">
                  <div class="ask_edit_wrap" style="position: relative;font-weight: normal;margin-bottom: 0;cursor: pointer;">
                    <span style="display: inline-block;vertical-align: middle;font-size: 12px;color: #999;margin-right: 45px;">{{q.ques_time}}</span>
                  </div>
                </div>
                <div class="a_share_bar_con" style="color: #999;width:850px;font-size: 12px;background: none;padding-left: 20px;margin: 10px 20px 10px 0;height: 30px">
                  <a class="collection" style="color: #999;text-decoration:none" onclick="window.csdn.loginBox.show()" href="javascript:;">评论0</a>
                  <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                  <i class="el-icon-thumb"></i>
                  <em>0</em>
                  <span class="interval" style="margin: 10px;color: #cdcdcd;">|</span>
                  <span style="color: #999;text-decoration:none"> 已采纳会显示，未采纳不显示</span>

                </div>
              </div-->
            </div>
            <div id="author_answer_form" style="background: #fcfcff;border: 1px solid #f0f0f0;">
              <div class="answer_form_con" style="overflow: hidden;margin: 20px;position: relative;">
                <el-form ref="answerForm" :model="answerForm" :rules="rules">
                  <el-form-item style="margin-bottom: 0px">
                    <div class="edit_container" style="position: relative;width: 100%;height: 280px;">
                      <quill-editor v-model="answerForm.a_contenttest" ref="myQuillEditor"  class="editor" style="height: 200px;" :options="editorOption" @ready="onEditorReady($event)" @change="onEditorChange($event)">
                      <!-- 自定义toolar -->
                      <div id="toolbar" slot="toolbar">
                        <!-- Add a bold button -->
                        <button class="ql-bold" title="加粗">Bold</button>
                        <button class="ql-italic" title="斜体">Italic</button>
                        <button class="ql-underline" title="下划线">underline</button>
                        <button class="ql-strike" title="删除线">strike</button>
                        <button class="ql-blockquote" title="引用"></button>
                        <button class="ql-code-block" title="代码"></button>
                        <button class="ql-header" value="1" title="标题1"></button>
                        <button class="ql-header" value="2" title="标题2"></button>
                        <!--Add list -->
                        <button class="ql-list" value="ordered" title="有序列表"></button>
                        <button class="ql-list" value="bullet" title="无序列表"></button>
                        <!-- Add font size dropdown -->
                        <select class="ql-header" style="line-height: 24px;width: 60px" title="段落格式">
                          <option selected>段落</option>
                          <option value="1">标题1</option>
                          <option value="2">标题2</option>
                          <option value="3">标题3</option>
                          <option value="4">标题4</option>
                          <option value="5">标题5</option>
                          <option value="6">标题6</option>
                        </select>
                        <select class="ql-size" style="line-height: 24px;width: 60px" title="字体大小">
                          <option value="10px">10px</option>
                          <option value="12px">12px</option>
                          <option value="14px">14px</option>
                          <option value="16px" selected>16px</option>
                          <option value="18px">18px</option>
                          <option value="20px">20px</option>
                        </select>
                        <select class="ql-font" style="line-height: 24px;width: 60px" title="字体">
                          <option value="SimSun">宋体</option>
                          <option value="SimHei">黑体</option>
                          <option value="Microsoft-YaHei">微软雅黑</option>
                          <option value="KaiTi">楷体</option>
                          <option value="FangSong">仿宋</option>
                          <option value="Arial">Arial</option>
                        </select>
                        <!-- Add subscript and superscript buttons -->
                        <select class="ql-color" style="line-height: 24px;" value="color" title="字体颜色"></select>
                        <select class="ql-background" style="line-height: 24px" value="background" title="背景颜色"></select>
                        <select class="ql-align" style="line-height: 24px" value="align" title="对齐"></select>
                        <button class="ql-clean" title="还原"></button>
                        <!-- You can also add your own -->
                      </div>
                    </quill-editor>
                    <span class="SizeTiShi" style="font-size: 14px;float:right;margin-right: 10px;margin-top: 15px">{{TiLength}}</span>
                  </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button style="float: right" @click.native="onSubmit" >确认提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
    </div>
  </div>

</template>

<script>
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import qs from 'qs'
  import '../../assets/css/font.css'

    export default {
      name: "questionPage",
      components:{
        quillEditor
      },
      data() {
        return {
          answerlist: [],
          answerForm:{
            a_contenttest:'',
            a_content:'',
          },
          editorOption: {
            placeholder: "请输入",
            theme: "snow", // or 'bubble'
            modules: {
              toolbar: {
                container: '#toolbar'
              }
            },
          },
          TiLength:0,
          rules:{
            a_content: [
              {required: true, message: '请输入详细内容', trigger: 'blur'}
            ]
          },
          id:'',
          quesTitle:'',
          quesContent:'',
          quesTime:'',
          quesUserId:'',
          quesUserName:'',
          quesColNum:'',
          quesState:'',
          quesReward:'',
          userId:'',
        }
      },
      computed:{
        editor(){
          return this.$refs.myQuillEditor.quill
        }
      },
      created(){
        this.getParams();
      },
      mounted() {
        //console.log("mounted中getdata的id" + this.$route.query.ques_id)
        this.getqData();
        this.getaData();
      },
      watch:{
        '$route':'getParams'
      },
      methods:{
        getParams:function () {
          this.id = this.$route.query.ques_id
          console.log("传来的参数=="+this.id)
          this.userId=this.$store.state.user.userId
          //this.textareText = this.id
        },
        getqData(){
          this.$axios.post('http://localhost:8080/online_answer/common/viewQuestionInfo',
            qs.stringify({
              quesId: this.id
            })
          ).then((response) => {
              console.log("quesId:" + this.id)
              console.log("qdata:",response.data.data);
              this.quesTitle=response.data.data.question.quesTitle;
              this.quesContent=response.data.data.question.quesContent;
              this.quesTime=response.data.data.question.quesTime
              this.quesUserId=response.data.data.question.userId
              this.quesColNum=response.data.data.question.quesColNum
              this.quesState=response.data.data.question.quesState
              this.quesReward=response.data.data.question.quesReward
              this.$axios.post('http://localhost:8080/online_answer/user/searchUserInfoByUserId',
                qs.stringify({
                  userId: this.quesUserId
                })
              ).then((response) => {
                console.log("quesUserId:" + this.quesUserId)
                console.log("qUdata:",response.data.data);
                this.quesUserName=response.data.data.name;
              })
                .catch((error)=>{
                  console.log(error);
                });
            })
            .catch((error)=>{
              console.log(error);
            });
        },
        getaData(){
          this.$axios.post('http://localhost:8080/online_answer/common/selectAnssByGoodCount',
            qs.stringify({
              quesId: this.id
            })
          ).then((response) => {
            console.log("quesId:" + this.id)
            console.log("adata:",response.data.data);
            this.answerlist=response.data.data
            //this.quesTitle=response.data.data.quesTitle;
            //this.quesContent=response.data.data.quesContent;
            //this.quesTime=response.data.data.quesTime
          })
            .catch((error)=>{
              console.log(error);
            });
        },
        getUserName(userid){
          var uname;
          this.$axios.post('http://localhost:8080/online_answer/user/searchUserInfoByUserId',
            qs.stringify({
              userId: userid
            })
          ).then((response) => {
            console.log("userId:" + userid)
            console.log("namedata:",response.data.data.name);
            uname=response.data.data.name;
            console.log("uname:",uname);
            return uname;
          })
            .catch((error)=>{
              console.log(error);
            });
        },
        check_user_status(){

        },
        onEditorChange(event){
          event.quill.deleteText(800,4)
          if(this.content === ''){
            this.TiLength = 0
          }else{
            this.TiLength = event.quill.getLength() - 1
          }
        },
        onEditorReady(editor){

        },
        onSubmit(){
          if(this.$store.state.user){
            console.log("已登录")
            console.log(this.$store.state.user.userId)
            console.log(this.quesId)
            this.answerForm.a_content=this.answerForm.a_contenttest.replace(/<[^>]+>/g,"")
            console.log(this.answerForm.a_content)
            this.$refs.answerForm.validate((valid) => {
              if (valid) {
                this.$axios.post(
                  'http://localhost:8080/online_answer/user/answer',
                  qs.stringify({
                    userId:this.$store.state.user.userId,
                    quesId:this.id,
                    ansContent:this.answerForm.a_content,
                  })
                ).then(response => {
                  console.log(response)
                  console.log("回答成功")
                  alert(response.data.resultDesc)
                  history.go(0)
                  /*this.$router.push({
                    path: '/userGuide', query:{user_id: this.data.userId}
                  });*/
                }).catch(error => {
                  console.log(error)
                })
              } else {
                return false
              }
            })
          }
          else{
            this.$router.push('/userlogin')
          }
        }
      },

    }

  // Vue.filter('dateFormat',function(quesTime){
  //   return moment(quesTime).format("YYYY-MM-DD HH:mm:ss");
  // })
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
