<template>
  <div class="top">
    <span style="font-size: 30px">被屏蔽问题列表</span>
    <div>
      <el-row>
        <el-col :span="4">
          <el-input v-model="search_input" placeholder="请输入问题标题" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="search">搜索</el-button>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div>

    <div style="margin: 20px 0">
      <el-table
        class="blockedQuestionList"
        :data="bqListData"
        style="width: 100%"
        :default-sort = "{prop: 'ques_time', order: 'descending'}">

        <el-table-column
          sortable
          prop="ques_id"
          label="问题id"
          header-align="left"
          align="left"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="ques_title"
          label="问题标题"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="ques_time"
          label="发布的最新时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>


        <el-table-column
          sortable
          prop="ques_ans_state"
          label="问题解决状态"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          sortable
          prop="ques_state"
          label="问题状态"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
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
    var listJson = {
    bqListData: [{
      ques_id: '1',
      ques_title: 'hhh',
      ques_time: '2011',
      ques_ans_state: '1',
      ques_state: '2',
    },
      {
        ques_id: '2',
        ques_title: 'yyy',
        ques_time: '2016',
        ques_ans_state: '1',
        ques_state: '2',
      },
      {
        ques_id: '3',
        ques_title: 'ttt',
        ques_time: '2014',
        ques_ans_state: '1',
        ques_state: '2',
      }],
  }
    export default {
        name: "blockedQuestionListOfAdmin",
      data() {
        return {
          bqListData:[],
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
      /*    mounted(){
            this.getbqListData();
          },*/
      methods: {
        pageList() {
          // 发请求拿到数据并暂存全部数据,方便之后操作
          this.data = listJson.bqListData
          this.getbqListData()
        },
        getbqListData:function() {
          let bqListData = this.data.filter((item,index) =>
            item.ques_title.includes(this.search_input)
          )
          this.bqListData=bqListData.filter((item,index)=>
            index < this.page * this.limit && index >= this.limit * (this.page - 1)
          )
          this.total = bqListData.length
          /*this.$axios.get(
            '127.0.0.1/online_answer/user/login'
          ).then(response => {
            const res = response.data
            if (res.data) {
              const data = res.data
              this.bqListData = data.bqListData
            }
          }).catch(error => {
            console.log('错误信息：' + error)
          })*/
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
        }
      }
    }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
