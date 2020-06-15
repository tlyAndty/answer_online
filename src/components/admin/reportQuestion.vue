<template>
  <div class="top">
    <span style="font-size: 30px">待处理的信息列表</span>
    <div style="margin-top: 20px">
      <el-row>
        <div style="float: left">
          <el-cascader
            v-model="value"
            style="width: 200px;float: left;margin-left: 20px"
            :options="options"
            @change="selectChange"
          >
          </el-cascader>
        </div>
        <div style="float: left">
          <a style="float: left;text-decoration: none;color: #999;margin-left: 10px;line-height: 40px" href="javascript:history.go(0)">重置</a>
        </div>
        <div v-if="this.value[1]==1||this.value[1]==2||this.value[1]==3" style="float: right;margin-right: 10px;">
          <el-button @click="rejectAll">批量拒绝</el-button>
        </div>
        <div v-if="this.value[1]==1||this.value[1]==2||this.value[1]==3" style="float: right;margin-right: 10px;">
          <el-button @click="passAll">批量通过</el-button>
        </div>
        <div style="float: right;margin-right:20px;">
          <el-button style="float: left" @click="search">搜索</el-button>
        </div>
        <div style="float: right;margin-right: 10px;">
          <el-input style="width: 140px" v-model="search_input" placeholder="请输入举报理由" ></el-input>
        </div>
      </el-row>
    </div>

    <div style="margin: 10px 0">
      <el-table
        class="reportUserList"
        :data="uListData"
        style="width: 100%"
        :default-sort = "{prop: 'reportTime', order: 'descending'}"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          v-if="this.value[1]==1||this.value[1]==2||this.value[1]==3"
        >
        </el-table-column>

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
          prop="reportUserId"
          label="举报者用户id"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="reportTypeId"
          label="举报者对象id"
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
          prop="reportTime"
          label="举报时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="uListData">
            {{ uListData.row.reportTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <a style="text-decoration: none;color: #409EFF;margin-right: 10px;" @click="passReport(scope.row.reportId)">通过</a>
            <a style="text-decoration: none;color: #409EFF;" @click="rejectReport(scope.row.reportId)">拒绝</a>
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
    name: "reportQuestion",
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
          value: 'reportType',
          label: '被举报对象的类型',
          children: [{
            value: '1',
            label: '问题'
          }, {
            value: '2',
            label: '回答'
          }, {
            value: '3',
            label: '评论'
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
        this.$axios.post('http://localhost:8080/online_answer/admin/searchReportsByTypeAndState',
          qs.stringify({
            reportType: '4',
            reportState: '0'
          })
        ).then((response) => {
          console.log(response.data.data);
          this.uListData = response.data.data;
          if(this.value){
            if(this.testuListData.length==0){
              for(let item of this.uListData) {
                console.log("item:", this.value[0])
                if(this.value[0]=='reportType'){
                  console.log("value[0]是类型分类")
                  if(item.reportType==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testuListData.push(item)
                    console.log(item)
                  }
                }
              }
            }else if(this.testuListData.length!=0){
              console.log("清空this.testuListData")
              this.testuListData.length=0
              for(let item of this.uListData) {
                console.log("item:", this.value[0])
                if(this.value[0]=='reportType'){
                  console.log("value[0]是类型分类")
                  if(item.reportType==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testuListData.push(item)
                    console.log(item)
                  }
                }
              }
            }
            console.log("this.testuListData是",this.testuListData)
            this.data = this.testuListData
          }else {
            this.data = this.uListData
          }
          this.getlist();
        }).catch((error) => {
          console.log(error);
        });
      },
      getlist(){
        let uListData = this.data.filter((item,index) =>
          item.reportContent.includes(this.search_input)
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
      passReport(val){
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyReportState',
          qs.stringify({
            reportId: val,
            reportState: '1',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          alert("通过了这个举报")
          console.log("修改成功")
          history.go(0)
        }).catch((error) => {
          console.log(error);
        });
      },
      rejectReport(val){
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyReportState',
          qs.stringify({
            reportId: val,
            reportState: '2',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          alert("拒绝了这个举报")
          console.log("修改成功")
          history.go(0)
        }).catch((error) => {
          console.log(error);
        });
      },
      formatUserId(row, column) {
        var name;
        console.log("userId:",row.reportUserId)
        this.$axios.post('http://localhost:8080/online_answer/user/searchUserInfoByUserId',
          qs.stringify({
            userId: row.reportUserId,
          })
        ).then((response) => {
          console.log(response.data.data.name)
          console.log("修改成功")
          name=response.data.data.name
          console.log("name",name)
        }).catch((error) => {
          console.log(error);
        });
        return name
      },
      passAll(){
        if(this.multipleSelection.length==0){
          alert("您没有选择任何举报")
        }
        else {
          console.log("要通过的举报有",this.multipleSelection)
          this.$confirm('此操作将通过举报, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for(var i=0;i<this.multipleSelection.length;i++){
              console.log(this.multipleSelection[i].reportId)
              this.$axios.post('http://localhost:8080/online_answer/admin/modifyReportState',
                qs.stringify({
                  reportId: this.multipleSelection[i].reportId,
                  reportState: '1',
                })
              ).then((response) => {
                console.log(response.data.resultCode)
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
          alert("您没有选择任何举报")
        }
        else {
          console.log("要拒绝的举报有",this.multipleSelection)
          this.$confirm('此操作将拒绝举报, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for(var i=0;i<this.multipleSelection.length;i++){
              console.log(this.multipleSelection[i].reportId)
              this.$axios.post('http://localhost:8080/online_answer/admin/modifyReportState',
                qs.stringify({
                  reportId: this.multipleSelection[i].reportId,
                  reportState: '2',
                })
              ).then((response) => {
                console.log(response.data.resultCode)
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
