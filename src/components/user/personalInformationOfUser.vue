<template>
  <div class="top">
    <span style="font-size: 30px">个人信息</span>
    <el-form :model="infoForm" status-icon :rules="rules" ref="infoForm" class="demo-infoForm" style="width: 400px; margin:20px auto;">
      <el-form-item label="头像" prop="headshot">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          style="border: 1px dashed #DCDFE6;
                 border-radius: 6px;
                 cursor: pointer;
                 position: relative;
                 overflow: hidden;
                 font-size: 28px;
                 color: #8c939d;
                 width: 100px;
                 height: 100px;
                 line-height: 100px;
                 margin-left: 150px;"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="">
          <i v-else class="el-icon-plus avatar-uploader-icon" style=""></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="ID" prop="adminid">
        <el-input class="text" placeholder=data.userid v-model="infoForm.userid" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input class="text" placeholder=data.name v-model="infoForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input class="text" placeholder=data.mail v-model="infoForm.mail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="pwd">
        <el-input class="text" placeholder=data.pwd v-model.number="infoForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input class="text" placeholder=data.newPwd v-model.number="infoForm.newPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('infoForm')">修改</el-button>
        <el-button @click="resetForm('infoForm')">重置</el-button>
      </el-form-item>
    </el-form >

  </div>
</template>

<script>
    export default {
        name: "personalInformationOfUser",
      data() {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('年龄不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (value < 18) {
                callback(new Error('必须年满18岁'));
              } else {
                callback();
              }
            }
          }, 1000);
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.infoForm.checkPass !== '') {
              this.$refs.infoForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value == this.infoForm.pwd) {
            callback(new Error('新密码不能与旧密码相同!'));
          } else {
            callback();
          }
        };
        return {
          infoForm: {
            userid:'',
            name: '',
            mail: '',
            pwd: '',
            newPwd:'',
          },
          rules: {
            pwd: [
              { validator: validatePass, trigger: 'blur' }
            ],
            newPwd: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          },
          imageUrl:'',
        };
      },
      methods: {
        getParams:function () {
          this.id = this.$route.query.user_id
          console.log("传来的u参数=="+this.id)
        },
        getqListData: function () {
          this.$axios.post('http://localhost:8080/online_answer/user/searchQuestionsByState',
            qs.stringify({
              userId: this.id,
              quesState: '3',
            })
          ).then((response) => {
            console.log(response.data.data);
            this.qListData = response.data.data;
          }).catch((error) => {
            console.log(error);
          });
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post('http://localhost:8080/online_answer/user/modifyUserInfo',
                {
                  params: {
                    quesState: '3',
                  }
                })
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }
    }
</script>

<style scoped>
  .top{
    text-align:center;
  }

  .avatar-uploader-icon {

  }

</style>
