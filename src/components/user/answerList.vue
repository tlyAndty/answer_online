<template>
  <div class="top">
    <span style="font-size: 30px">回答列表</span>
    <div>
      <el-row>
        <el-col :span="4">
          <el-input v-model="search_input" placeholder="请输入回答标题" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="search">搜索</el-button>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div>

    <div style="margin: 20px 0">
      <el-table
      class="answerList"
      :data="aListData"
      style="width: 100%"
      :default-sort = "{prop: 'ans_time', order: 'descending'}">

      <el-table-column
        sortable
        prop="ans_id"
        label="回答id"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="ans_content"
        label="回答内容"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="ans_time"
        label="回答发布时间"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>



      <el-table-column
        sortable
        prop="good_count"
        label="赞的个数"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        sortable
        prop="bad_count"
        label="踩的个数"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        sortable
        prop="ans_state"
        label="回答的状态"
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
    aListData: [{
      ans_id:'1',
      ans_content:'内容a',
      ans_time:'2020-03-27 13:07:40',
      good_count:'1',
      bad_count:'2',
      ans_state:'0',
    },
      {
        ans_id:'2',
        ans_content:'内容g',
        ans_time:'2020-03-24 13:07:40',
        good_count:'1',
        bad_count:'2',
        ans_state:'0',
      },
      {
        ans_id:'3',
        ans_content:'内容w',
        ans_time:'2020-03-21 13:07:40',
        good_count:'1',
        bad_count:'2',
        ans_state:'0',
      }],
  }
  export default {
    name: "answerList",
    data() {
      return {
        aListData:[],
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
    /*mounted(){
      this.getaListData();
    },*/
    methods: {
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        this.data = listJson.aListData
        this.getaListData()
      },
      getaListData:function() {
        let aListData = this.data.filter((item,index) =>
          item.ans_content.includes(this.search_input)
        )
        this.aListData=aListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = aListData.length
        /*this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.aListData = data.aListData
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
            this.aqListData = data.aqListData
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
            this.aListData = data.aListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })
      },
        orderByGood:function () {
        this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.aListData = data.aListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })
      },
      orderByBad:function () {
        this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.aListData = data.aListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.getaListData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getaListData()
      },
      search() {
        this.page = 1
        this.getaListData()
      }
    }
  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
