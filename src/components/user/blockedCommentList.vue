<template>
  <div class="top">
    <span style="font-size: 30px">屏蔽评论列表</span>
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
      class="blockedCommentList"
      :data="bcListData"
      style="width: 100%"
      :default-sort = "{prop: 'com_time', order: 'descending'}">

      <el-table-column
        sortable
        prop="com_id"
        label="评论id"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >

      </el-table-column>
      <el-table-column
        sortable
        prop="com_content"
        label="评论内容"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="com_time"
        label="评论时间"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>



      <el-table-column
        sortable
        prop="com_state"
        label="评论状态"
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
    bcListData: [{
      com_id:'1',
      com_content:'内容s',
      com_time:'2020-03-27 13:07:40',
      com_state:'0',
    },
      {
        com_id:'2',
        com_content:'内容j',
        com_time:'2020-03-20 13:07:40',
        com_state:'0',
      },
      {
        com_id:'6',
        com_content:'内容i',
        com_time:'2020-03-26 13:07:40',
        com_state:'0',
      }],
  }
  export default {
    name: "blockedCommentList",
    data() {
      return {
        bcListData:[],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
      }
    },
    /*mounted() {
      this.getbcListData();
    },*/
    created() {
      this.pageList()
    },
    methods: {
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        this.data = listJson.bcListData
        this.getbcListData()
      },
      getbcListData: function () {
        let bcListData = this.data.filter((item,index) =>
          item.com_content.includes(this.search_input)
        )
        this.bcListData=bcListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = bcListData.length
        /*this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.bcListData = data.bcListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })*/
      },
      orderById: function () {
        this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.bcqListData = data.bcqListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })
      },
      orderByTime: function () {
        this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.bcListData = data.bcListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.getbcListData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getbcListData()
      },
      search() {
        this.page = 1
        this.getbcListData()
      }
    }
  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
