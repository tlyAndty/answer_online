<template>
  <div class="top">
    <span style="font-size: 30px">个人信息</span>
    <el-form :model="user" status-icon :rules="rules" ref="infoForm" class="demo-infoForm" style="width: 400px; margin:20px auto;">
      <el-form-item label="头像" prop="headshot">
        <el-upload
          class="avatar-uploader"
          :action="doUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="">
          <i v-else class="el-icon-plus avatar-uploader-icon" style=""></i>
        </el-upload>
        <div>点击头像即可更换</div>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input class="text" placeholder=请输入名字 v-model="user.name" autocomplete="off" :readonly="isRead"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input class="text" placeholder=请输入邮箱 v-model="user.mail" autocomplete="off" :readonly="isRead"></el-input>
      </el-form-item>
      <el-form-item label="积分" prop="capital">
        <el-input class="text" placeholder=资产 v-model="user.capital" autocomplete="off" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item v-show="isShow" label="旧密码" prop="pwd">
        <el-input class="text" type="password" v-show="isShow" placeholder=请输入旧密码 v-model="user.pwd"></el-input>
      </el-form-item>
      <el-form-item v-show="isShow" label="新密码" prop="newPwd">
        <el-input class="text" type="password" v-show="isShow" placeholder=请输入新密码 v-model="user.newPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="show();submitForm('infoForm')">修改</el-button>
        <el-button v-show="isShow" @click="resetForm('infoForm')">重置</el-button>
      </el-form-item>
    </el-form >
  </div>
</template>

<script>
  import qs from 'qs';
  import {isValidMail} from '../../js/rule';
  export default {
    name: "personalInformationOfUser",
    data() {
      var validMail=(rule, value,callback)=>{
        if (!value){
          callback(new Error('请输入邮箱！'))
        }else  if (!isValidMail(value)){
          callback(new Error('请输入正确的邮箱！'))
        }else {
          callback()
        }
      };
      // var validatePass = (rule, newPwd, callback) => {
      //   if (!newPwd) {
      //     callback(new Error('请再次输入密码'));
      //   } else if (newPwd == this.user.pwd) {
      //     callback(new Error('新密码不能与旧密码相同!'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
        user: {
          userid:'',
          name: '',
          mail: '',
          pwd: '',
          newPwd:'',
          image:'',
          capital:'',
        },
        isShow:false,
        isRead:true,
        rules: {
          pwd: [
            {required: true, message: '请输入密码!', trigger: 'blur'},
            { min: 6, max: 20, message: '请输入6-20位字符!', trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: '请再次输入旧密码或者重新输入新密码!', trigger: 'blur' },
            { min: 6, max: 20, message: '请输入6-20位字符!', trigger: 'blur' }
          ],
          mail: [
            {trigger: 'blur',validator: validMail}
          ],
        },
        imageUrl:'',
        uData:{},
        id:'',
        doUpload:'',
        pwd:'',
        newPwd:'',
      };
    },
    watch:{
      '$route':'getParams'
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
      show: function (){
        console.log("show");
        this.isShow = true;
        this.isRead = false;
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
          this.user.image=this.uData.image
          this.user.capital = this.uData.capital
          this.$store.state.user.image=this.user.image
          this.imageUrl = "http://localhost:8080"+this.uData.image
          console.log("uname",this.uData.name)
          console.log("在数据库中的image：",this.uData.image)
          console.log("该data中的imageUrl：",this.imageUrl)
        }).catch((error) => {
          console.log(error);
        });
      },
      submitForm(formName) {
        /*if(!this.user.newPwd){
          console.log("没有修改密码")
          this.pwd=this.user.pwd
          this.newPwd=this.user.pwd
        }
        else {
          console.log("修改了密码")
          this.pwd=this.user.pwd
          this.newPwd=this.user.newPwd
        }*/
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
        // this.$refs[formName].resetFields();
        this.user.name = '';
        this.user.mail = '';
        this.user.pwd = '';
        this.user.newPwd = '';
      },
      handleAvatarSuccess(res,file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log("我是handleAvatarSuccess文件是：",file)
      },
      beforeAvatarUpload(file,id) {
        let fd = new FormData()
        fd.append('file',file)
        fd.append('userId',this.uData.userId)
        this.$axios.post('http://localhost:8080/online_answer/user/upload',
          fd
        ).then((response) => {
          console.log("我是beforeAvatarUpload，并且userId:"+this.uData.userId)
          console.log("我是beforeAvatarUpload，并且文件:"+file)
          console.log("我是beforeAvatarUpload:"+response)
          this.$store.state.user.image=this.user.image
          console.log("state.user",this.$store.state.user)
          history.go(0)
        })
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
