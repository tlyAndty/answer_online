<template>
  <el-container style="height: 560px; border: 1px solid #eee">

    <el-aside width="200px" >
      <el-menu :unique-opened="true" :default-active="$route.path"            @select="handleSelect">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
          <el-menu-item index="userList">所有用户列表</el-menu-item>
          <el-menu-item index="registrationAudit">待审核用户列表</el-menu-item>
          <el-menu-item index="blacklistedUserList">被拉黑用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-postcard"></i>问题管理</template>
          <el-menu-item index="questionListOfAdmin">所有问题列表</el-menu-item>
          <el-menu-item index="blockedQuestionListOfAdmin">被屏蔽问题列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-chat-round"></i>回答管理</template>
          <el-menu-item index="answerListOfAdmin">所有回答列表</el-menu-item>
          <el-menu-item index="blockedAnswerListOfAdmin">被屏蔽回答列表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-chat-dot-square"></i>评论管理</template>
          <el-menu-item index="commentListOfAdmin">所有评论列表</el-menu-item>
          <el-menu-item index="blockedCommentListOfAdmin">被屏蔽评论列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-message"></i>举报管理</template>
          <el-submenu index="5-1">
            <template slot="title">待处理的举报</template>
              <!--el-menu-item index="reportUser">被举报用户列表</el-menu-item-->
              <el-menu-item index="reportQuestion">被举报问题列表</el-menu-item>
              <el-menu-item index="reportAnswer">被举报回答列表</el-menu-item>
              <el-menu-item index="reportComment">被举报评论列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5-2">
            <template slot="title">已处理的举报</template>
              <!--el-menu-item index="reportUser">被举报用户列表</el-menu-item-->
              <el-menu-item index="reportQuestion">被举报问题列表</el-menu-item>
              <el-menu-item index="reportAnswer">被举报回答列表</el-menu-item>
              <el-menu-item index="reportComment">被举报评论列表</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="personalInformationOfAdmin"><i class="el-icon-setting"></i>个人信息</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main style="background-color: #fbfdf8">
      <router-view></router-view>
    </el-main>
      <el-footer style="padding: 0px;height: 40px">
        <div style="background-color: #fbfdf8;text-align: center;font-size: 12px;height: 100%">
          <div style="">
            <a id="admin_login" href="/adminlogin" style="color:black;text-decoration:none">管理员登录</a>
          </div>
          <span>Copyright © 2020-3020 tly&ty. All Rights Reserved.</span>
        </div>
      </el-footer>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    name: "adminGuide",
    //inject:['reload'],
    data() {
      return {
        id:'',
        //isRouterAlive: true
      }
    },
    created(){
      this.getParams();
    },
    /*provide(){
      return{
        reload:this.reload
      }
    },*/
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
      /*reload(){
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }*/
    }
  };
</script>

<style>

  .el-aside {
    color: #333;
  }
</style>
