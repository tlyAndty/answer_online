<template>
  <div class="questionInfo" style="background: white;padding: 0px">
    <router-link to="/" class="gobackLink"><< 返回列表</router-link>
    <div class="main clearfix" style="margin: 0px;">
      <div class="q_info" style="margin-right: 100px;margin-left: 100px;margin-top: 10px" >
        <div id="question_form" style="background: #fcfcff;border: 1px solid #f0f0f0;">
          <div class="question_form_con" style="overflow: hidden;margin: 20px;position: relative;">
            <el-form ref="questionForm" :model="questionForm" :rules="rules">
              <el-form-item>
                <div class="edit_title" style="position: relative;width: 100%;">
                  <el-input  v-model="questionForm.a_title" placeholder="输入问题标题" style="margin-bottom: 10px;"></el-input>
                </div>
              </el-form-item>
              <el-form-item style="margin-bottom: 0px">
                <div class="edit_container" style="position: relative;width: 100%;height: 340px;background-color: white">
                  <quill-editor v-model="questionForm.a_contenttest" ref="myQuillEditor"  class="editor" style="height: 300px;background-color: white" :options="editorOption" @ready="onEditorReady($event)" @change="onEditorChange($event)">
                    <div id="toolbar" slot="toolbar">
                      <button class="ql-bold" title="加粗">Bold</button>
                      <button class="ql-italic" title="斜体">Italic</button>
                      <button class="ql-underline" title="下划线">underline</button>
                      <button class="ql-strike" title="删除线">strike</button>
                      <button class="ql-blockquote" title="引用"></button>
                      <button class="ql-code-block" title="代码"></button>
                      <button class="ql-header" value="1" title="标题1"></button>
                      <button class="ql-header" value="2" title="标题2"></button>
                      <button class="ql-list" value="ordered" title="有序列表"></button>
                      <button class="ql-list" value="bullet" title="无序列表"></button>
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
                      <select class="ql-color" style="line-height: 24px" value="color" title="字体颜色"></select>
                      <select class="ql-background" style="line-height: 24px" value="background" title="背景颜色"></select>
                      <select class="ql-align" style="line-height: 24px" value="align" title="对齐"></select>
                      <button class="ql-clean" title="还原"></button>
                    </div>
                  </quill-editor>
                  <span class="SizeTiShi" style="font-size: 14px;float:right;margin-right: 10px;margin-top: 10px">{{TiLength}}</span>
                </div>
              </el-form-item>
              <el-form-item>
                <div>
                  <span>悬赏：</span>
                  <el-input v-model="questionForm.a_reward" placeholder="请输入悬赏积分"></el-input>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button style="float: right" @click="submit('questionForm')" >发布</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import qs from 'qs';
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import '../../assets/css/font.css'

  export default {
    name: "newquestionPage",
    components:{
      quillEditor
    },
    data() {
      return {
        questionForm:{
          a_title: '',
          a_contenttest:'',
          a_content:'',
          a_reward:'',
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
        inputVisible: false,
        inputValue: '',
        checkList: [],
        id:'',
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
        this.id = this.$route.query.user_id
        console.log("传来的user参数=="+this.id)
      },
      /*getData(id){
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
      },*/
      submit(formName) {
        //this.$router.push('/')
        this.$refs[formName].validate((valid) => {
          console.log("formName:",formName)
          if (valid) {
            console.log(this.id)
            console.log(this.questionForm.a_title,)
            console.log(this.questionForm.a_contenttest)
            console.log(this.questionForm.a_reward)
            this.questionForm.a_content=this.questionForm.a_contenttest.replace(/<[^>]+>/g,"")
            console.log(this.questionForm.a_content)
            this.$axios.post(
              'http://localhost:8080/online_answer/user/question',
              qs.stringify({
                userId: this.id,
                quesTitle: this.questionForm.a_title,
                quesContent: this.questionForm.a_content,
                quesReward: this.questionForm.a_reward,
              })
            ).then(response => {
              console.log(response.data.resultCode)
              console.log("修改成功")
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
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
      /*handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },*/
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
