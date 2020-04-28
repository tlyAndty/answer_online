<template>
  <el-container style="height: 560px; border: 1px solid #eee">
    <el-aside width="200px" >
      <el-menu :unique-opened="true" :default-active="$route.path"            @select="handleSelect">
        <el-menu-item index="registrationAudit"><i class="el-icon-message"></i>注册审核</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
          <el-menu-item index="userList">所有用户列表</el-menu-item>
          <el-menu-item index="blacklistedUserList">被拉黑用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>问题管理</template>
          <el-menu-item index="questionListOfAdmin">所有问题列表</el-menu-item>
          <el-menu-item index="blockedQuestionListOfAdmin">被屏蔽问题列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="personalInformationOfAdmin"><i class="el-icon-setting"></i>个人信息</el-menu-item>
      </el-menu>
    </el-aside>


    <el-main style="background-color: #fbfdf8">
      <router-view></router-view>
    </el-main>



  </el-container>

</template>

<script>
  export default {
    name: "adminGuide",
    data() {
      return {
        id:'',
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
        this.id = this.$route.query.admin_id
        console.log("传来的参数=="+this.id)
      },
      handleSelect(path){
        this.$router.push({path:path,query:{admin_id: this.id}})
      },
    }
  };
</script>

<style>

  .el-aside {
    color: #333;
  }
</style>
