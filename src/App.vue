<template>
  <el-container direction="vertical">
    <el-header v-if="$route.meta.keepAlive" class="header" height="60px" width="100%">
      <div>
        <div style="float:left;font-size: 30px; position:relative; top:7px ">
        探源问答
      </div>
        <div v-if="user" style="position: absolute;right: 15px;top: -15px">
          <router-link style="color:white;text-decoration:none;margin-right:20px;" :to="{name:'newquestionPage',query:{user_id:user.userId}}">我要提问</router-link>
          <router-link style="margin-right: 5px;color: #ffffff;text-decoration:none" :to="{name:'userGuide',query:{user_id:user.userId}}">{{user.name}}</router-link>
          <router-link style="margin-right: 15px;color: #ffffff;text-decoration:none;position: relative;top: 20px" :to="{name:'userGuide',query:{user_id:user.userId}}">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="height:50px;width:50px;border-radius:25px;border:none;">
          </router-link>
        <el-dropdown trigger="click" style="color: white;margin-right: 10px;font-size: 16px">
          <span class="el-dropdown-link">
            消息
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              <router-link style="text-decoration:none" :to="{path:'replyedAnswerList',query:{user_id: this.$store.state.user.userId}}">回答</router-link>
              <!--a href="" style="text-decoration:none">回答</a-->
              <el-badge class="mark" :value="this.notReadAnswer" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <!--a href="" style="text-decoration:none">评论</a-->
              <router-link style="text-decoration:none" :to="{path:'replyedCommentList',query:{user_id: this.$store.state.user.userId}}">评论</router-link>
              <el-badge class="mark" :value="this.notReadComment" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <!--a href="" style="text-decoration:none">评论</a-->
              <router-link style="text-decoration:none" :to="{path:'reportedQuestionList',query:{user_id: this.$store.state.user.userId}}">举报</router-link>
              <el-badge class="mark" :value="this.notReadReport" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
          <router-link style="color: #ffffff;text-decoration:none" :to="{name:'main'}">首页</router-link>
        /
        <a id="logout_link1" href="/" @click="logout" style="color: white;text-decoration:none">登出</a>
      </div>
        <div v-else-if="admin" style="position: absolute;right: 15px;top: -15px ">
          <router-link style="color:white;text-decoration:none;margin-right:20px" :to="{name:'newquestionPage',query:{user_id:admin.adminId}}">我要提问</router-link>
          <!--span style="margin-right: 5px">{{admin.name}}</span-->
          <router-link style="margin-right: 5px;color: #ffffff;text-decoration:none" :to="{name:'adminGuide',query:{admin_id:admin.adminId}}">{{admin.name}}</router-link>
          <router-link style="margin-right: 15px;color: #ffffff;text-decoration:none;position: relative;top: 20px" :to="{name:'adminGuide',query:{admin_id:admin.adminId}}">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="height:50px;width:50px;border-radius:25px;border:none;">
          </router-link>
          <!--el-dropdown trigger="click" style="color: white;margin-right: 10px;font-size: 16px">
          <span class="el-dropdown-link">
            消息
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">
                <a href="" style="text-decoration:none">回答</a>
                <el-badge class="mark" :value="6"/>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                <a href="" style="text-decoration:none">评论</a>
                <el-badge class="mark" :value="6" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown-->
          <!--a id="main_link1" href="/" style="color: white;text-decoration:none">首页</a-->
          <router-link style="color: #ffffff;text-decoration:none" :to="{name:'main'}">首页</router-link>
          /
          <a id="logout_link2" href="/" @click="logout" style="color: white;text-decoration:none">登出</a>
        </div>
        <div v-else style="position: absolute;right: 15px;top: 17px ">
          <router-link style="color:white;text-decoration:none;margin-right:15px" :to="{name:'userlogin'}">我要提问</router-link>
        <a id="main_link2" href="/" style="color: white;text-decoration:none">首页</a>
        /
        <a id="login_link" href="/userlogin" style="color: white;text-decoration:none">登录</a>
      </div>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  import qs from 'qs';

  export default {
    name: 'App',
    data(){
      return{
        //imageUrl:'',
        aListData:[],
        baListData:[],
        testaListData:[],
        cListData:[],
        bcListData:[],
        testcListData:[],
        rListData:[],
        brListData:[],
        testrListData:[],
      }
    },
    methods:{
      logout(){
        console.log("正在登出")
        this.$store.dispatch('logout')
        //sessionStorage.removeItem("user")
        //window.location.reload()
        //sessionStorage.setItem("store", null)
        console.log(this.$store.state)
        alert("登出成功")
      },
      reload(){
        this.isRouterAlive=false
        this.$nextTick(()=>this.isRouterAlive=true)
      },
      getaListData:function() {
        this.$axios.post('http://localhost:8080/online_answer/user/searchAnswerInfo',
          qs.stringify({
            userId: this.$store.state.user.userId,
          })
        ).then((response) => {
          console.log("response.data.data",response.data.data);
          this.aListData = response.data.data;
          if(this.baListData.length!=0){
            this.baListData.length=0
          }
          for(let item of this.aListData) {
            if(item.ansState==0){
              //console.log(item.userId)
              this.baListData.push(item)
              //console.log(item)
            }
          }
          this.aListData = this.baListData;
          console.log("this.aListData",this.aListData)
          if(this.testaListData.length!=0){
            console.log("清空this.testuListData")
            this.testaListData.length=0
          }
          for(let item of this.aListData) {
            //console.log("item:", this.value[0])
              if(item.isRead==0) {
                  //console.log("value[1]是",this.value[1])
                this.testaListData.push(item)
                  //console.log("item",item)
              }
          }
          //console.log("this.testaListData是",this.testaListData)
          //this.notReadAnswer=this.testaListData.length
          console.log("未读回答数量",this.notReadAnswer)
        }).catch((error) => {
          console.log(error);
        });

      },
      getcListData:function() {
        this.$axios.post('http://localhost:8080/online_answer/user/searchCommentsByState',
          qs.stringify({
            userId: this.$store.state.user.userId,
            comState:'5'
          })
        ).then((response) => {
          console.log(response.data.data);
          this.cListData = response.data.data;
          if(this.bcListData.length!=0){
            this.bcListData.length=0
          }
          for(let item of this.cListData) {
            if(item.comState==0){
              console.log(item.userId)
              this.bcListData.push(item)
              console.log(item)
            }
          }
          this.cListData = this.bcListData;
          console.log("this.cListData",this.cListData)
            if(this.testcListData.length!=0){
              console.log("清空this.testcListData")
              this.testcListData.length=0
            }
            for(let item of this.cListData) {
              //console.log("item:", this.value[0])
                if(item.isRead==0) {
                 // console.log("value[1]是",this.value[1])
                  this.testcListData.push(item)
                  //console.log("item",item)
                }
            }
          console.log("未读评论数量",this.notReadComment)
        }).catch((error) => {
          console.log(error);
        });
      },
      getrListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/user/searchReportedsByTypeAndState',
          qs.stringify({
            reportedUserId: this.$store.state.user.userId,
            reportType: '4',
            reportState: '3',
          })
        ).then((response) => {
          console.log("response.data.data",response.data.data);
          this.brListData = response.data.data;
            if(this.testrListData.length!=0){
              console.log("清空this.testrListData")
              this.testrListData.length=0
            }for(let item of this.brListData) {
              //console.log("item:", this.value[0])
              if(item.isRead==0) {
                //console.log("value[1]是",this.value[1])
                this.testrListData.push(item)
                //console.log(item)
              }
            }
            console.log("this.testrListData是",this.testrListData)

        }).catch((error) => {
          console.log(error);
        });
      },
    },
    created() {
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        console.log("存vuex前的数据")
        console.log(this.$store.state,JSON.parse(sessionStorage.getItem("store")))

        sessionStorage.setItem("store", JSON.stringify(this.$store.state))

        console.log("存vuex后的数据")
        console.log(this.$store.state,JSON.parse(sessionStorage.getItem("store")))
      })
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        console.log("读取sessionstorage前的数据")
        console.log(this.$store.state,JSON.parse(sessionStorage.getItem("store")))

        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))

        console.log("读取sessionstorage后的数据")
        console.log(this.$store.state,JSON.parse(sessionStorage.getItem("store")))
      }
      this.getaListData()
      this.getcListData()
      this.getrListData()
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      admin() {
        return this.$store.state.admin
      },
      imageUrl(){
        if(this.user){
          console.log("现在是用户登录状态")
          return "http://localhost:8080"+this.$store.state.user.image
        }
        else if(this.admin){
          console.log("现在是管理员登录状态")
          console.log("管理员头像:",this.$store.state.admin)
          return "http://localhost:8080"+this.$store.state.admin.image
        }
      },
      notReadAnswer(){
        if(this.user){
          //this.getaListData()
          console.log("记录未读回答数",this.testaListData.length)
          return this.testaListData.length
        }
      },
      notReadComment(){
        if(this.user){
          //this.getaListData()
          console.log("记录未读评论数",this.testcListData.length)
          return this.testcListData.length
        }
      },
      notReadReport(){
        if(this.user){
          //this.getaListData()
          console.log("记录未读被举报数",this.testrListData.length)
          return this.testrListData.length
        }
      },
    },
  }
</script>

<style>
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
</style>
