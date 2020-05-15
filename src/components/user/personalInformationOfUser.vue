<template>
  <div class="top">
    <span style="font-size: 30px">个人信息</span>
    <el-form :model="user" status-icon :rules="rules" ref="infoForm" class="demo-infoForm" style="width: 400px; margin:20px auto;">
      <el-form-item label="头像" prop="headshot">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/online_answer/user/upload"
          :show-file-list="false"
          :data="paramsdata"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="">
          <i v-else class="el-icon-plus avatar-uploader-icon" style=""></i>
        </el-upload>
      </el-form-item>
      <!--el-form-item label="ID" prop="userid">
        <el-input class="text" placeholder=data.userid v-model="user.userid" autocomplete="off" :readonly="true"></el-input>
      </el-form-item-->
      <el-form-item label="名字" prop="name">
        <el-input class="text" placeholder=data.name v-model="user.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input class="text" placeholder=data.mail v-model="user.mail" autocomplete="off"></el-input>
      </el-form-item>
      <!--el-form-item label="旧密码" prop="pwd">
        <el-input class="text" placeholder=data.pwd v-model.number="user.pwd" :readonly="true"></el-input>
      </el-form-item-->
      <el-form-item label="新密码" prop="newPwd">
        <el-input class="text" placeholder=请输入新密码 v-model.number="user.newPwd"></el-input>
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
    name: "personalInformationOfUser",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value == this.user.pwd) {
          callback(new Error('新密码不能与旧密码相同!'));
        } else {
          callback();
        }
      };
      return {
        user: {
          userid:'',
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
        uData:{},
        id:'',
        paramsdata:{
          userId: this.id,
        }
      };
    },
    created() {
      this.getParams()
      this.getqListData()
    },
    methods: {
      getParams:function () {
        this.id = this.$route.query.user_id
        console.log("传来的u参数=="+this.id)
      },
      getqListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/user/searchUserInfoByUserId',
          qs.stringify({
            userId: this.id,
          })
        ).then((response) => {
          console.log("uData:",response.data.data);
          this.uData = response.data.data;
          this.user.userid = this.uData.userId
          this.user.name = this.uData.name
          this.user.mail = this.uData.mail
          this.user.pwd = this.uData.pwd
          this.imageUrl = "http://localhost:8080"+this.uData.image
            // this.$axios.post('http://localhost:8080'+this.uData.image,
            //
            // ).then((response) => {
            //   console.log("图片访问成功")
            // }).catch((error) => {
            //   console.log(error);
            // });
          console.log("uname",this.uData.name)
          console.log("在数据库中的image：",this.uData.image)
          console.log("该data中的imageUrl：",this.imageUrl)
        }).catch((error) => {
          console.log(error);
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log("formName:",this.user.name)
          if (valid) {
            this.$axios.post(
              'http://localhost:8080/online_answer/user/modifyUserInfo',
              qs.stringify({
                userId: this.user.userid,
                mail: this.user.mail,
                name: this.user.name,
                pwd: this.user.pwd,
                newPwd: this.user.newPwd,
              })
            ).then(response => {
              console.log(response.data.resultCode)
              console.log("修改成功")
              alert(response.data.resultDesc)
              history.go(0)
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
      handleAvatarSuccess(res,file) {
        /*this.$axios.post('http://localhost:8080/online_answer/user/upload',
          qs.stringify({
            file: file,
            userId: this.uData.userId
          })
        ).then((response) => {
          console.log("我是handleAvatarSuccess，并且userId:"+this.uData.userId)
          console.log("我是handleAvatarSuccess，并且文件:"+file)
          console.log("我是response.data:"+response)
          //console.log("image的url：" + response.data.data.imageUrl);
          //return response.data.data.imageUrl
        })*/
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log("我是handleAvatarSuccess文件是：",file)
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
        console.log("我是beforeAvatarUpload")
        return isJPG && isLt2M;
        // return false;
      }
    }
  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
  .avatar-uploader{
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
