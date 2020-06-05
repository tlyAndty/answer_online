<template>
  <el-container style="height: 565px; border: 1px solid #eee;">
    <el-aside width="240px" >
      <el-menu :unique-opened="true" :default-active="$route.path" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-postcard"></i>问题管理</template>
            <el-menu-item index="questionListOfUser">问题列表</el-menu-item>
          <!--el-menu-item index="blockedQuestionListOfUser">被屏蔽问题列表</el-menu-item-->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-chat-round"></i>回答管理</template>
            <el-menu-item index="answerList">发出的回答列表</el-menu-item>
            <el-menu-item index="replyedAnswerList">收到的回答列表</el-menu-item>
            <!--el-submenu index="2-1">
              <template slot="title">发布的回答</template>
                <el-menu-item index="answerList">所有回答列表</el-menu-item>
                <el-menu-item index="blockedAnswerList">被屏蔽回答列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">收到的回答</template>
            </el-submenu-->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-chat-dot-square"></i>评论管理</template>
            <el-menu-item index="commentList">发出的评论列表</el-menu-item>
            <!--el-submenu index="3-1">
              <template slot="title">发布的评论</template>
                <el-menu-item index="commentList">所有评论列表</el-menu-item>
                <el-menu-item index="blockedCommentList">被屏蔽评论列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2">
              <template slot="title">收到的评论</template>
            </el-submenu-->
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-message"></i>举报管理</template>
            <el-menu-item index="reportQuestionList">举报的信息列表</el-menu-item>
          <!--el-submenu index="4-1">
            <template slot="title">发出的举报</template>
              <el-menu-item index="reportQuestionList">被举报的信息列表</el-menu-item>
              <el-menu-item index="reportAnswerList">被举报的回答列表</el-menu-item>
              <el-menu-item index="reportCommentList">被举报的评论列表</el-menu-item>
              <el-submenu index="4-1-2">
                <template slot="title">已被处理的举报</template>
                  <el-menu-item index="processedReportQuestionList">被举报的问题列表</el-menu-item>
                  <el-menu-item index="processedReportAnswerList">被举报的回答列表</el-menu-item>
                  <el-menu-item index="processedReportCommentList">被举报的评论列表</el-menu-item>
              </el-submenu>
          </el-submenu-->
            <el-menu-item index="reportedQuestionList">被举报的信息列表</el-menu-item>
          <!--el-submenu index="4-2">
            <template slot="title">收到的举报</template>
              <el-menu-item index="reportedQuestionList">被举报的问题列表</el-menu-item>
              <el-menu-item index="reportedAnswerList">被举报的回答列表</el-menu-item>
              <el-menu-item index="reportedCommentList">被举报的评论列表</el-menu-item>
          </el-submenu-->
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-star-on"></i>收藏夹</template>
            <el-menu-item index="collectionList">收藏列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="personalInformationOfUser"><i class="el-icon-setting"></i>个人信息</el-menu-item>
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
    name: "userGuide",
    data() {
      return {
        id:'',
        //imageUrl:'',
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
        console.log("传来的参数=="+this.id)
        this.imageUrl="http://localhost:8080"+this.$store.state.user.image
        console.log("imageUrl",this.imageUrl)
      },
      handleSelect(path){
        this.$router.push({path:path,query:{user_id: this.id}})
      },
    }
  };
</script>

<style scoped>
  html,body{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .header{
    background-color: lightcoral;
    color: white;
  }
  .el-aside {
    color: #333;
  }
</style>
