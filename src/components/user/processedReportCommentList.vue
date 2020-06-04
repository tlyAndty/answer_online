<template>
  <div class="top">
    <span style="font-size: 30px">举报的评论列表</span>
    <div>
      <el-row>
        <el-col :span="4">
          <el-input v-model="search_input" placeholder="请输入用户名" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="search">搜索</el-button>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div>
    <div style="margin: 20px 0">
      <el-table
        class="reportUserList"
        :data="puListData"
        style="width: 100%"
        :default-sort = "{prop: 'reportTime', order: 'descending'}">

        <el-table-column
          label="举报id"
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
          prop="reportTypeId"
          label="评论id"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="reportContent"
          label="举报理由"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          sortable
          prop="reportedUserId"
          label="被举报人用户id"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="reportState"
          label="处理结果"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
          :formatter="formatReportState"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="reportTime"
          label="举报时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="puListData">
            {{ puListData.row.reportTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

        <!--el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="passReport(scope.row.reportId)">通过</el-button>
            <el-button type="text" @click="rejectReport(scope.row.reportId)">拒绝</el-button>
          </template>
        </el-table-column-->

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
    name: "processedReportQuestionList",
    //inject:['reload'],
    data() {
      return {
        uListData:[],
        puListData:[],
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
        this.id = this.$route.query.user_id
        console.log("传来的u参数=="+this.id)
      },
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        this.getParams()
        this.getuListData()
      },
      getuListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/user/searchReportsByTypeAndState',
          qs.stringify({
            reportUserId: this.id,
            reportType: '3',
            reportState: '3',
          })
        ).then((response) => {
          console.log(response.data.data);
          this.uListData = response.data.data;
          for(let item of this.uListData) {
            console.log("item:",item.reportState)
            if(item.reportState!=0){
              console.log(item.reportContent)
              this.puListData.push(item)
              console.log(item)
            }
          }
          this.data = this.puListData
          this.getlist();
          console.log("得到了被举报的问题",this.puListData)
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
        this.total = puListData.length
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
      passReport(val){
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
        //this.reload()
        location.reload()
      },
      rejectReport(val){
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyUserState',
          qs.stringify({
            userId: val,
            userState: '2',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          console.log("修改成功")
        }).catch((error) => {
          console.log(error);
        });
        //this.reload()
        location.reload()
      },
      formatReportState(row, column) {
        if (row.reportState === 1) {
          return '同意'
        } else if (row.reportState === 2) {
          return '拒绝'
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
