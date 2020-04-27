<template>
  <div class="top">
    <span style="font-size: 30px">评论列表</span>
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
      class="commentList"
      :data="cListData"
      style="width: 100%"
      :default-sort = "{prop: 'com_time', order: 'descending'}">

      <el-table-column
        sortable
        prop="comId"
        label="评论id"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="comContent"
        label="评论内容"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="comTime"
        label="评论时间"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
        <template slot-scope="cListData">
          {{ cListData.row.comTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
         </template>
      </el-table-column>



      <el-table-column
        sortable
        prop="comState"
        label="评论状态"
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
          <el-button type="text" @click="modifyUser(scope.row.phone)">修改</el-button>
          <el-button type="text" @click="deleteUser(scope.row.phone)">删除</el-button>
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
    cListData: [/*{
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
      }*/],
  }
  export default {
    name: "commentList",
    data() {
      return {
        cListData:[],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
      }
    },
    /*mounted() {
      this.getcListData();
    },*/
    created() {
      this.pageList()
    },
    methods: {
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        this.data = listJson.cListData
        this.getcListData()
      },
      getcListData:function() {
        this.$axios.post('http://localhost:8080/online_answer/user/searchCommentsByUserId',
          qs.stringify({
            userId: '2',
          })
        ).then((response) => {
          console.log(response.data.data);
          this.cListData = response.data.data;
        }).catch((error) => {
          console.log(error);
        });
        let cListData = this.data.filter((item,index) =>
          item.com_content.includes(this.search_input)
        )
        this.cListData=cListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = cListData.length
        /*this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.cListData = data.cListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })*/
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.getcListData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getcListData()
      },
      search() {
        this.page = 1
        this.getcListData()
      },
      deleteUser(val){
        console.log(val)

//这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等
      },
      modifyUser(val){
        let self = this;
      },
      checkDetail(val){
        window.location.href='/questionPage'
        console.log(val)
      },
    }

  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
