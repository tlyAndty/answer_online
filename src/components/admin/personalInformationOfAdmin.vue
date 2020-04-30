<template>
  <div class="top">
    <span style="font-size: 30px">个人信息</span>
    <el-form :model="admin" status-icon :rules="rules" ref="infoForm" class="demo-infoForm" style="width: 400px; margin:20px auto;">
      <!--el-form-item label="头像" prop="headshot" style="">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="">
          <i v-else class="el-icon-plus avatar-uploader-icon" style=""></i>
        </el-upload>
      </el-form-item-->
      <el-form-item label="ID" prop="adminid">
        <el-input class="text" placeholder=data.adminid v-model="admin.adminid" autocomplete="off" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input class="text" placeholder=data.name v-model="admin.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input class="text" placeholder=data.mail v-model="admin.mail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input class="text" placeholder=data.pwd v-model.number="admin.pwd" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input class="text" placeholder=请输入新密码 v-model.number="admin.newPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('infoForm')">修改</el-button>
        <el-button @click="resetForm('infoForm')">重置</el-button>
      </el-form-item>
    </el-form >
  </div>
</template>

<script>
  import qs from 'qs';
    export default {
        name: "personalInformationOfAdmin",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value == this.admin.pwd) {
            callback(new Error('新密码不能与旧密码相同!'));
          } else {
            callback();
          }
        };
        return {
          admin: {
            adminid:'',
            name: '',
            mail: '',
            pwd: '',
            newPwd:'',
          },
          rules: {
            newPwd: [
              { validator: validatePass, trigger: 'blur' }
            ],
          },
          imageUrl:'',
        };
      },
      created() {
        this.getParams()
        this.getqListData()
      },
      methods: {
        getParams:function () {
          this.id = this.$route.query.admin_id
          console.log("传来的adminid参数=="+this.id)
        },
        getqListData: function () {
          this.$axios.post('http://localhost:8080/online_answer/admin/searchAdminInfoByAdminId',
            qs.stringify({
              adminId: this.id,
            })
          ).then((response) => {
            console.log("aData:",response.data.data);
            this.aData = response.data.data;
            this.admin.adminid = this.aData.adminId
            this.admin.name = this.aData.name
            this.admin.mail = this.aData.mail
            this.admin.pwd = this.aData.pwd
            console.log("aname",this.aData.name)
          }).catch((error) => {
            console.log(error);
          });
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            console.log("formName:",this.admin.name)
            if (valid) {
              this.$axios.post(
                'http://localhost:8080/online_answer/user/modifyUserInfo',
                qs.stringify({
                  adminId: this.admin.adminid,
                  mail: this.admin.mail,
                  name: this.admin.name,
                  pwd: this.admin.pwd,
                  newPwd: this.admin.newPwd,
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
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(response, file) {
          this.$axios.post('http://localhost:8080/online_answer/user/upload',
            qs.stringify({
              userId: this.id,
              file: file
            })
          ).then((response) => {
            console.log("上传成功",response)
            //console.log("image的url：" + response.data.data.imageUrl);
            //return response.data.data.imageUrl
          })
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
</style>
