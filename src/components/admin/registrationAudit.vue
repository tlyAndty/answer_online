<template>
  <div class="top">
    <span style="font-size: 30px">注册用户列表</span>
    <div>
      <el-row>
        <el-col :span="4">
          <el-input v-model="search_input" placeholder="请输入注册时间" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="search">搜索</el-button>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div>
    <div style="margin: 20px 0">
      <el-table
        class="registerList"
        :data="rListData"
        style="width: 100%"
        :default-sort = "{prop: 'addTime', order: 'descending'}">

        <el-table-column
          sortable
          prop="name"
          label="用户名字"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          sortable
          prop="mail"
          label="用户邮箱"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="pwd"
          label="用户密码"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          sortable
          prop="addTime"
          label="注册时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="rListData">
            {{ rListData.row.addTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope.row.userId)">查看详情</el-button>
            <el-button type="text" @click="acceptUser(scope.row.userId)">通过</el-button>
            <el-button type="text" @click="rejectUser(scope.row.userId)">拒绝</el-button>
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
  var listJson={
    uListData:[/*{
      user_id:'1',
      mail:'1@qq.com',
      name:'小明',
      state:'0',
      add_time:'2020-03-27 13:07:40',
    },
      {
        user_id:'2',
        mail:'1@qq.com',
        name:'小红',
        state:'0',
        add_time:'2020-03-27 13:07:40',
      },
      {
        user_id:'3',
        mail:'1@qq.com',
        name:'小王',
        state:'0',
        add_time:'2020-03-27 13:07:40',
      }*/],
  }
  export default {
    name: "registrationAudit",
    data() {
      return {
        uListData:[],
        rListData:[],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
        id:'',
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
        console.log("传来的id参数=="+this.id)
      },
      pageList() {
        this.data = listJson.uListData
        this.getParams()
        this.getrListData()
      },
      getrListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/admin/searchUsersByState',
          qs.stringify({
            userState: '4',
          })
        ).then((response) => {
          console.log("ulist:",response.data.data);
          this.uListData = response.data.data;
          for(let item of this.uListData) {
            if(item.state==0){
              //console.log(item.userId)
              this.rListData.push(item)
              //console.log(item)
            }
          }
        }).catch((error) => {
          console.log(error);
        });
        let rListData = this.data.filter((item,index) =>
          item.name.includes(this.search_input)
        )
        this.rListData=rListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = rListData.length
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.getrListData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getrListData()
      },
      search() {
        this.page = 1
        this.getrListData()
      },
      rejectUser(val){
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
          qs.stringify({
            userId: val,
            userState: '3',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          console.log("修改成功")
        }).catch((error) => {
          console.log(error);
        });
        location.reload()
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
        }).catch((error) => {
          console.log(error);
        });
        location.reload()
      },
      checkDetail(val){
        this.$router.push({path:path,query:{user_id:val}})
        console.log(val)
      },
    },
  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
