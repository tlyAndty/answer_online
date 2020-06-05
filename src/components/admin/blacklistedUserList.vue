<template>
  <div class="top">
    <span style="font-size: 30px">被拉黑用户列表</span>
    <div style="margin-top: 20px;">
      <el-row>
        <el-col :span="4">
          <el-input style="width: 140px;margin-left: 20px" v-model="search_input" placeholder="请输入用户名" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="float: left;margin-left: 20px" @click="search">搜索</el-button>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div>
    <div style="margin: 10px 0">
      <el-table
        class="buserList"
        :data="buListData"
        style="width: 100%"
        :default-sort = "{prop: 'addTime', order: 'descending'}">

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
          prop="name"
          label="用户名字"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          sortable
          prop="state"
          label="用户状态"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
          :formatter="formatState">
        </el-table-column>

        <el-table-column
          sortable
          prop="addTime"
          label="注册时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="buListData">
            {{ buListData.row.addTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope.row.userId)">查看详情</el-button>
            <el-button type="text" @click="unblacklistUser(scope.row.userId)">取消拉黑</el-button>
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
      name: "blacklistedUserList",
      data() {
        return {
          uListData:[],
          buListData:[],
          data: [],
          search_input: '',
          timeout: null,
          limit: 5,
          total: null,
          page:1,
        }
      },
      created() {
        this.pageList()
      },
      methods: {
        getParams:function () {
          this.id = this.$route.query.admin_id
          console.log("传来的id参数=="+this.id)
        },
        pageList() {
          // 发请求拿到数据并暂存全部数据,方便之后操作
          //this.data = listJson.buListData
          this.getParams()
          this.getbuListData()
        },
        getbuListData: function () {
          this.$axios.post('http://localhost:8080/online_answer/admin/searchUsersByState',
            qs.stringify({
              userState: '4',
            })
          ).then((response) => {
            console.log("ulist:",response.data.data);
            this.uListData = response.data.data;
            for(let item of this.uListData) {
              if(item.state==2){
                console.log(item.userId)
                this.buListData.push(item)
                console.log(item)
              }
            }
            this.data = this.buListData;
            this.getlist();
          }).catch((error) => {
            console.log(error);
          });

        },
        getlist(){
          let buListData = this.data.filter((item,index) =>
            item.name.includes(this.search_input)
          )
          this.buListData=buListData.filter((item,index)=>
            index < this.page * this.limit && index >= this.limit * (this.page - 1)
          )
          this.total = buListData.length
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.limit = val
          this.getbuListData()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page = val
          this.getbuListData()
        },
        search() {
          this.page = 1
          this.getbuListData()
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
          }).catch((error) => {
            console.log(error);
          });
          location.reload()
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
        }

      },
    }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
