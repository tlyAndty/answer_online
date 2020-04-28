<template>
  <div class="top">
    <span style="font-size: 30px">问题列表</span>
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
      class="questionList"
      :data="qListData"
      style="width: 100%"
      :default-sort = "{prop: 'ques_time', order: 'descending'}">

      <el-table-column
        sortable
        prop="quesId"
        label="问题id"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="quesTitle"
        label="问题标题"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="quesTime"
        label="发布的最新时间"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
        <template slot-scope="qListData">
          {{ qListData.row.quesTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="quesAnsState"
        label="问题解决状态"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        sortable
        prop="quesState"
        label="问题状态"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="checkDetail(scope.row.phone)">查看详情</el-button>
          <el-button type="text" @click="blockUser(scope.row.phone)">屏蔽</el-button>
          <el-button type="text" @click="unblockUser(scope.row.phone)">取消屏蔽</el-button>
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
  var listJson = {
    qListData: [/*{
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
      }*/],
  }
  export default {
    name: "questionListOfAdmin",
    data() {
      return {
        qListData:[],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
        id: '',
      }
    },
    watch:{
      '$route':'getParams'
    },
    created() {
      this.pageList()
    },
    methods: {
      getParams:function () {
        this.id = this.$route.query.admin_id
        console.log("传来的u参数=="+this.id)
      },
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        this.data = listJson.qListData
        this.getParams()
        this.getqListData()
      },
      getqListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/admin/searchQuestionsByState',
          qs.stringify({
            quesState: '3',
          })
        ).then((response) => {
          console.log(response.data.data);
          this.qListData = response.data.data;
        }).catch((error) => {
          console.log(error);
        });
        let qListData = this.data.filter((item,index) =>
          item.ques_title.includes(this.search_input)
        )
        this.qListData=qListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = qListData.length
        /*this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.qListData = data.qListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })*/
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.getqListData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getqListData()
      },
      search() {
        this.page = 1
        this.getqListData()
      },
      unblockUser(val){
        console.log(val)

//这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等
      },
      blockUser(val){
        let self = this;
      },
      checkDetail(val){
        window.location.href='/questionPage'
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
