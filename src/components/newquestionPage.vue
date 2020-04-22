<template>
  <div class="questionInfo" style="background: white;padding: 0px">
    <router-link to="/" class="gobackLink"><< 返回列表</router-link>
    <div class="main clearfix" style="margin: 0px;">
      <div class="q_info" v-for="q in list" style="margin-right: 100px;margin-left: 100px;margin-top: 10px" >
        <div id="author_answer_form" style="background: #fcfcff;border: 1px solid #f0f0f0;">
          <div class="answer_form_con" style="overflow: hidden;margin: 20px;position: relative;">
            <el-form ref="answerForm" :model="answerForm" :rules="rules">
              <el-form-item style="margin-bottom: 0px">
                <div class="edit_container" style="position: relative;width: 100%;height: 380px;">
                  <quill-editor v-model="answerForm.a_content" ref="myQuillEditor"  class="editor" style="height: 300px;" :options="editorOption" @ready="onEditorReady($event)" @change="onEditorChange($event)">
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
                      <select class="ql-header" title="段落格式">
                        <option selected>段落</option>
                        <option value="1">标题1</option>
                        <option value="2">标题2</option>
                        <option value="3">标题3</option>
                        <option value="4">标题4</option>
                        <option value="5">标题5</option>
                        <option value="6">标题6</option>
                      </select>
                      <select class="ql-size" title="字体大小">
                        <option value="10px">10px</option>
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px" selected>16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                      </select>
                      <select class="ql-font" title="字体">
                        <option value="SimSun">宋体</option>
                        <option value="SimHei">黑体</option>
                        <option value="Microsoft-YaHei">微软雅黑</option>
                        <option value="KaiTi">楷体</option>
                        <option value="FangSong">仿宋</option>
                        <option value="Arial">Arial</option>
                      </select>
                      <!-- Add subscript and superscript buttons -->
                      <select class="ql-color" value="color" title="字体颜色"></select>
                      <select class="ql-background" value="background" title="背景颜色"></select>
                      <select class="ql-align" value="align" title="对齐"></select>
                      <button class="ql-clean" title="还原"></button>
                      <!-- You can also add your own -->
                    </div>
                  </quill-editor>
                  <span class="SizeTiShi" style="font-size: 14px;float:right;margin-right: 10px;margin-top: 15px">{{TiLength}}</span>
                </div>
              </el-form-item>
              <el-form-item>

              </el-form-item>
              <el-form-item>
                <el-button style="float: right" @click="onsubmit" >发布</el-button>
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

  import '../assets/css/font.css'

  export default {
    name: "newquestionPage",
    components:{
      quillEditor
    },
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
        answerForm:{
          a_title: 'list.ques_title',
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
        }
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
      submit:function () {

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
        this.$refs.answerForm.validate((valid) => {
          if(valid){
            this.$post('',this.answerForm).then(res => {
              if(res.errCode == 200){
                this.$message({
                  message: res.errMsg,
                  type:'success'
                });
                this.$router.push('');
              }else{
                this.$message({
                  message: res.errMsg,
                  type:'error'
                });
              }
            });
          }
        });
      }
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
