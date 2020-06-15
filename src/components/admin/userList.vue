<template>
  <div class="top">
    <span style="font-size: 30px">用户列表</span>
    <div style="margin-top: 20px;">
      <el-row>
        <div style="float: left">
          <el-cascader
            v-model="value"
            style="width: 200px;float: left;margin-left: 20px"
            :options="options"
            @change="selectChange"
            clearable
          >
          </el-cascader>
        </div>
        <div style="float: left">
          <a style="float: left;text-decoration: none;color: #999;margin-left: 10px;line-height: 40px" href="javascript:history.go(0)">重置</a>
        </div>
        <div v-if="this.value[1]==0" style="float: right;margin-right: 10px;">
          <el-button @click="rejectAll">批量拒绝</el-button>
        </div>
        <div v-if="this.value[1]==0" style="float: right;margin-right: 10px;">
          <el-button @click="passAll">批量通过</el-button>
        </div>
        <div v-if="this.value[1]==1" style="float: right;margin-right: 10px;">
          <el-button @click="blacklistAll">批量拉黑</el-button>
        </div>
        <div v-if="this.value[1]==2" style="float: right;margin-right: 10px;">
          <el-button @click="unblacklistAll">批量取消拉黑</el-button>
        </div>
        <div style="float: right;margin-right:20px;">
          <el-button style="float: left" @click="search">搜索</el-button>
        </div>
        <div style="float: right;margin-right: 10px;">
          <el-input style="width: 140px" v-model="search_input" placeholder="请输入用户名" ></el-input>
        </div>
      </el-row>
    </div>
    <div style="margin: 10px 0">
      <el-table
      class="userList"
      :data="uListData"
      style="width: 100%"
      :default-sort = "{prop: 'addTime', order: 'descending'}"
      @selection-change="handleSelectionChange"
      >

        <el-table-column type="selection">
        </el-table-column>

      <el-table-column
        label="用户id"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template scope="scope">
          <span>{{(page - 1) * limit + scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="mail"
        label="用户邮箱"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="用户名字"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="state"
        label="用户状态"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
        :formatter="formatState"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="addTime"
        label="注册时间"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
        <template slot-scope="uListData">
          {{ uListData.row.addTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>

        <el-table-column
          sortable
          prop="reportNum"
          label="被举报数量"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <a v-if="scope.row.state==1||scope.row.state==2" style="text-decoration: none;color: #409EFF;margin-right: 10px;" @click="checkDetail(scope.row.userId)">查看详情</a>
          <a v-if="scope.row.state==1" style="text-decoration: none;color: #409EFF;margin-right: 10px;" @click="blacklistUser(scope.row.userId)">拉黑</a>
          <a v-if="scope.row.state==2" style="text-decoration: none;color: #409EFF;" @click="unblacklistUser(scope.row.userId)">取消拉黑</a>
          <a v-if="scope.row.state==0" style="text-decoration: none;color: #409EFF;margin-right: 10px;" @click="acceptUser(scope.row.userId)">通过</a>
          <a v-if="scope.row.state==0" style="text-decoration: none;color: #409EFF;" @click="rejectUser(scope.row.userId)">拒绝</a>
        </template>
      </el-table-column>

      </el-table>
    </div>
    <div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                     :page-sizes="[1, 2,5, 10]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';

    export default {
      name: "userList",
      //inject:['reload'],
      data() {
        return {
          uListData:[],
          testuListData:[],
          data: [],
          search_input: '',
          timeout: null,
          limit: 5,
          total: null,
          page:1,
          id:'',
          options: [{
            value: 'state',
            label: '用户的状态',
            children: [{
              value: '0',
              label: '未审核'
            }, {
              value: '1',
              label: '正常'
            }, {
              value: '2',
              label: '被拉黑'
            },{
              value: '3',
              label: '审核未通过'
            }]
          }],
          value: '',
          multipleSelection: []
        }
      },
      created() {
        this.pageList()
      },
      watch:{
        '$route':'getParams'
      },
      methods: {
        getParams:function () {
          this.id = this.$route.query.admin_id
          console.log("传来的u参数=="+this.id)
        },
        pageList() {
          // 发请求拿到数据并暂存全部数据,方便之后操作
          this.getParams()
          this.getuListData()
        },
        getuListData: function () {
          this.$axios.post('http://localhost:8080/online_answer/admin/searchUsersByState',
            qs.stringify({
              userState: '4',
            })
          ).then((response) => {
            console.log(response.data.data);
            this.uListData = response.data.data;
            if(this.value){
              if(this.testuListData.length!=0){
                console.log("清空this.testuListData")
                this.testuListData.length=0
              }
              for(let item of this.uListData) {
                //console.log("item:", this.value[0])
                if(this.value[0]=='state'){
                  //console.log("value[0]是类型分类")
                  if(item.state==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testuListData.push(item)
                    console.log("item",item)
                  }
                }
              }
              console.log("this.testuListData是",this.testuListData)
              this.data = this.testuListData
            }else {
              this.data = this.uListData
            }
            //this.data = this.uListData
            this.getlist();
          }).catch((error) => {
            console.log(error);
          });
        },
        getlist(){
          let uListData = this.data.filter((item,index) =>
            item.name.includes(this.search_input)
          )
          this.uListData=uListData.filter((item,index)=>
            index < this.page * this.limit && index >= this.limit * (this.page - 1)
          )
          this.total = uListData.length
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.limit = val
          this.getuListData()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page = val
          this.getuListData()
        },
        search() {
          this.page = 1
          this.getuListData()
        },
        unblacklistUser(val){
          this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
            qs.stringify({
              userId: val,
              userState: '1',
            })
          ).then((response) => {
            console.log(response.data.resultCode)
            console.log("修改成功")
            alert("取消拉黑成功")
            history.go(0)
          }).catch((error) => {
            console.log(error);
          });
          //this.reload()
          //location.reload()
        },
        blacklistUser(val){
          this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
            qs.stringify({
              userId: val,
              userState: '2',
            })
          ).then((response) => {
            console.log(response.data.resultCode)
            console.log("修改成功")
            alert("拉黑成功")
            history.go(0)
          }).catch((error) => {
            console.log(error);
          });
          //this.reload()
          //location.reload()
        },
        checkDetail(val){
          this.$router.push({path:'/userPage',query:{user_id:val}})
          console.log(val)
        },
        formatState(row, column) {
          if (row.state === 0) {
            return '未审核'
          } else if (row.state === 1) {
            return '正常'
          } else if (row.state === 2) {
            return '拉黑'
          } else if (row.state === 3) {
            return '审核未通过'
          }
        },
        rejectUser(val){
          this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
            qs.stringify({
              userId: val,
              userState: '3',
            })
          ).then((response) => {
            console.log(response.data)
            console.log("修改成功")
            alert("拒绝此用户的申请")
            history.go(0)
          }).catch((error) => {
            console.log(error);
          });
          //location.reload()
        },
        acceptUser(val){
          this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
            qs.stringify({
              userId: val,
              userState: '1',
            })
          ).then((response) => {
            console.log(response.data.resultCode)
            console.log("修改成功")
            alert("通过此用户的申请")
            history.go(0)
          }).catch((error) => {
            console.log(error);
          });
        },
        checkDetail(val){
          this.$router.push({path:'/userPage',query:{user_id:val}})
          console.log(val)
        },
        passAll(){
          if(this.multipleSelection.length==0){
            alert("您没有选择任何用户")
          }
          else {
            console.log("要通过的用户有",this.multipleSelection)
            this.$confirm('此操作将通过用户申请, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              for(var i=0;i<this.multipleSelection.length;i++){
                console.log(this.multipleSelection[i].userId)
                this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
                  qs.stringify({
                    userId: this.multipleSelection[i].userId,
                    userState: '1',
                  })
                ).then((response) => {
                  console.log(response.data.resultCode)
                  console.log("修改成功")
                }).catch((error) => {
                  console.log(error);
                });
              }
              alert("通过成功")
              history.go(0)
            }).catch(() => {
            });
          }
        },
        rejectAll(){
          if(this.multipleSelection.length==0){
            alert("您没有选择任何用户")
          }
          else {
            console.log("要通过的用户有",this.multipleSelection)
            this.$confirm('此操作将拒绝用户申请, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              for(var i=0;i<this.multipleSelection.length;i++){
                console.log(this.multipleSelection[i].userId)
                this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
                  qs.stringify({
                    userId: this.multipleSelection[i].userId,
                    userState: '3',
                  })
                ).then((response) => {
                  console.log(response.data.resultCode)
                  console.log("修改成功")
                }).catch((error) => {
                  console.log(error);
                });
              }
              alert("拒绝成功")
              history.go(0)
            }).catch(() => {
            });
          }
        },
        blacklistAll(){
          if(this.multipleSelection.length==0){
            alert("您没有选择任何用户")
          }
          else {
            console.log("要拉黑的用户有",this.multipleSelection)
            this.$confirm('此操作将拉黑用户申请, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              for(var i=0;i<this.multipleSelection.length;i++){
                console.log(this.multipleSelection[i].userId)
                this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
                  qs.stringify({
                    userId: this.multipleSelection[i].userId,
                    userState: '2',
                  })
                ).then((response) => {
                  console.log(response.data.resultCode)
                  console.log("修改成功")
                }).catch((error) => {
                  console.log(error);
                });
              }
              alert("拉黑成功")
              history.go(0)
            }).catch(() => {
            });
          }
        },
        unblacklistAll(){
          if(this.multipleSelection.length==0){
            alert("您没有选择任何用户")
          }
          else {
            console.log("要取消拉黑的用户有",this.multipleSelection)
            this.$confirm('此操作将取消拉黑用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              for(var i=0;i<this.multipleSelection.length;i++){
                console.log(this.multipleSelection[i].userId)
                this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
                  qs.stringify({
                    userId: this.multipleSelection[i].userId,
                    userState: '1',
                  })
                ).then((response) => {
                  console.log(response.data.resultCode)
                  console.log("修改成功")
                }).catch((error) => {
                  console.log(error);
                });
              }
              alert("取消拉黑成功")
              history.go(0)
            }).catch(() => {
            });
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log("this.multipleSelection",this.multipleSelection)
        },
        selectChange(value) {
          console.log("value0",value[0])
          console.log("value1",value[1])
          this.page = 1
          this.getuListData()
        },
      },
    }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
