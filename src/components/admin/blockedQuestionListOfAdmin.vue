<template>
  <div class="top">
    <span style="font-size: 30px">被屏蔽问题列表</span>
    <div style="margin-top: 20px;">
      <el-row>
        <el-col :span="4">
          <el-input style="width: 140px;margin-left: 20px" v-model="search_input" placeholder="请输入问题标题" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="float: left;margin-left: 20px" @click="search">搜索</el-button>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div>

    <div style="margin: 10px 0">
      <el-table
        class="blockedQuestionList"
        :data="bqListData"
        style="width: 100%"
        :default-sort = "{prop: 'quesTime', order: 'descending'}">

        <el-table-column
          label="问题id"
          header-align="left"
          align="left"
        >
          <template scope="scope">
            <span>{{(page - 1) * limit + scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column
          sortable
          prop="question.quesTitle"
          label="问题标题"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="question.quesTime"
          label="发布的最新时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="bqListData">
            {{ bqListData.row.question.quesTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>


        <el-table-column
          sortable
          prop="question.quesAnsState"
          label="问题解决状态"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
          :formatter="formatAnsState"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="question.quesState"
          label="问题状态"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
          :formatter="formatAnsState"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope.row.quesId)">查看详情</el-button>
            <el-button type="text" @click="unblockQues(scope.row.quesId)">取消屏蔽</el-button>
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
        name: "blockedQuestionListOfAdmin",
      data() {
        return {
          qListData:[],
          bqListData:[],
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
      /*    mounted(){
            this.getbqListData();
          },*/
      watch:{
        '$route':'getParams'
      },
      methods: {
        getParams:function () {
          this.id = this.$route.query.admin_id
          console.log("传来的id参数=="+this.id)
        },
        pageList() {
          // 发请求拿到数据并暂存全部数据,方便之后操作
          //this.data = listJson.bqListData
          this.getParams()
          this.getbqListData()
        },
        getbqListData:function() {
          this.$axios.post('http://localhost:8080/online_answer/admin/searchQuestionsByState',
            qs.stringify({
              quesState: '3',
            })
          ).then((response) => {
            console.log("qlist:",response.data.data);
            this.qListData = response.data.data;
            for(let item of this.qListData) {
              if(item.question.quesState!=0){
                console.log(item.question.userId)
                this.bqListData.push(item)
                console.log(item)
              }
            }
            this.data=this.bqListData
            console.log("this.data:",this.data)
            console.log("total1:",this.data.length)
            this.getlist()
          }).catch((error) => {
            console.log(error);
          });
        },
        getlist(){
          let bqListData = this.data.filter((item,index) =>
            item.question.quesTitle.includes(this.search_input)
          )
          this.bqListData=bqListData.filter((item,index)=>
            index < this.page * this.limit && index >= this.limit * (this.page - 1)
            //console.log(index,index < this.page * this.limit && index >= this.limit * (this.page - 1))
          )
          this.total = bqListData.length
          console.log("total2:",bqListData.length)
        },
        orderById:function () {
          this.$axios.get(
            '127.0.0.1/online_answer/user/login'
          ).then(response => {
            const res = response.data
            if (res.data) {
              const data = res.data
              this.bqListData = data.bqListData
            }
          }).catch(error => {
            console.log('错误信息：' + error)
          })
        },
        orderByTime:function () {
          this.$axios.get(
            '127.0.0.1/online_answer/user/login'
          ).then(response => {
            const res = response.data
            if (res.data) {
              const data = res.data
              this.bqListData = data.bqListData
            }
          }).catch(error => {
            console.log('错误信息：' + error)
          })
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.limit = val
          this.getbqListData()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page = val
          this.getbqListData()
        },
        search() {
          this.page = 1
          this.getbqListData()
        },
        unblockQues(val){
          this.$axios.post('http://localhost:8080/online_answer/admin/modifyQuestionState',
            qs.stringify({
              quesId: val,
              quesState: '0',
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
          this.$router.push({path:'/questionPage',query:{ques_id:val}})
          console.log(val)
        },
        formatAnsState(row, column){
          if(row.question.quesAnsState=== 0){
            return '未解决'
          }
          else if(row.question.quesAnsState === 1){
            return '已解决'
          }
          else if(row.question.quesAnsState === 2){
            return '已关闭'
          }
          //return row.quesAnsState == 0 ? '未解决' : row.quesAnsState == 1 ? '已解决' : row.quesAnsState == 2 ? '已关闭';
          //return '已解决'
        },
        formatState(row, column) {
          if (row.question.quesState === 0) {
            return '未屏蔽'
          } else if (row.question.quesState === 1) {
            return '管理员屏蔽'
          } else if (row.question.quesState === 2) {
            return '因用户被拉黑而被屏蔽'
          }
        }
      }
    }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
