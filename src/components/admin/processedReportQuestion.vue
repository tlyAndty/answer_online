<template>
  <div class="top">
    <span style="font-size: 30px">已处理的信息列表</span>
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
    name: "processedReportQuestion",
    //inject:['reload'],
    data() {
      return {
        uListData:[],
        testuListData:[],
        puListData:[],
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
        value: ''
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
            reportState: '3'
          })
        ).then((response) => {
          console.log("response.data.data",response.data.data);
          this.uListData = response.data.data;
          for(let item of this.uListData) {
            if(item.reportState!=0){
              //console.log(item.userId)
              this.puListData.push(item)
              //console.log(item)
            }
          }
          console.log("都是已处理：",this.puListData)
          if(this.value){
            console.log("this.value：有值")
            console.log("this.testuListData.length:",this.testuListData.length)
            if(this.testuListData.length==0){
              for(let item of this.puListData) {
                console.log("this.value[0]:", this.value[0])
                if(this.value[0]=='reportType'){
                  //console.log("value[0]是类型分类")
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
              for(let item of this.puListData) {
                console.log("this.value[0]:", this.value[0])
                if(this.value[0]=='reportType'){
                  //console.log("value[0]是类型分类")
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
            console.log("this.value：为空")
            this.data = this.puListData
          }
          this.getlist();
        }).catch((error) => {
          console.log(error);
        });
      },
      getlist(){
        let puListData = this.data.filter((item,index) =>
          item.reportContent.includes(this.search_input)
        )
        this.puListData=puListData.filter((item,index)=>
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
      },
      selectChange(value) {
        console.log("value0",value[0])
        console.log("value1",value[1])
        this.page = 1
        this.getuListData()
        /*if(value[0]=='reportType'){
          console.log("根据处理结果分类")
        }
        else if(value[0]=='reportState'){
          console.log("根据处理结果分类")
        }*/
      },
    },
  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
