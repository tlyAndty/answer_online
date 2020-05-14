<template>
  <div class="top">
    <span style="font-size: 30px;">收藏列表</span>
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
        class="collectionList"
        :data="colListData"
        style="width: 100%"
        :default-sort = "{prop: 'quesTime', order: 'descending'}">

        <el-table-column
          label="问题id"
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
          <template slot-scope="colListData">
            {{ colListData.row.quesTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
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
            <el-button type="text" @click="checkDetail(scope.row.quesId)">查看详情</el-button>
            <el-button type="text" @click="deleteCol(scope.row.quesId)">取消收藏</el-button>
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
    colListData: [],
  }
  export default {
    name: "collectionList",
    data() {
      return {
        colListData: [],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
        id:'',
      }
    },
    /*mounted() {
      this.getqListData();
    },*/
    watch:{
      '$route':'getParams'
    },
    created() {
      this.pageList()
    },
    methods: {
      getParams:function () {
        this.id = this.$route.query.user_id
        console.log("传来的u参数=="+this.id)
      },
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        this.data = listJson.colListData
        this.getParams()
        this.getcolListData()
      },
      getcolListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/user/displayPersonalCollections',
          qs.stringify({
            userId: this.id,
          })
        ).then((response) => {
          console.log("col:",response.data.data);
          this.colListData = response.data.data;
        }).catch((error) => {
          console.log(error);
        });
        let colListData = this.data.filter((item,index) =>
          item.quesTitle.includes(this.search_input)
        )
        this.colListData=colListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = colListData.length
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.getcolListData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getcolListData()
      },
      search() {
        this.page = 1
        this.getcolListData()
      },
      deleteCol(val){
        this.$axios.post('http://localhost:8080/online_answer/user/deleteCollections',
          qs.stringify({
            colUserId: this.id,
            colQuesId: val,
          })
        ).then((response) => {
          console.log(response.data);
          console.log("取消成功")
        }).catch((error) => {
          console.log(error);
        });
        console.log("colUserId:",this.id)
        console.log("colQuesId:",val)
        //location.reload()
      },
      checkDetail(val){
        this.$router.push({path:'/questionPage',query:{ques_id:val}})
        console.log(val)
      },

    },
  }
</script>

<style>
  .top{
    text-align:center;
  }
</style>

