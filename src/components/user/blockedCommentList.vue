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
      :default-sort = "{prop: 'comTime', order: 'descending'}">

      <el-table-column
        label="评论id"
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
      </el-table-column>



      <el-table-column
        sortable
        prop="comState"
        label="评论状态"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
        :formatter="formatState"
      >
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <!--el-button type="text" @click="checkDetail(scope.row.comId)">查看详情</el-button-->
          <!--el-button type="text" @click="modifyCom(scope.row.comId)">修改</el-button-->
          <el-button type="text" @click="deleteCom(scope.row.comId)">删除</el-button>
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
    name: "blockedCommentList",
    data() {
      return {
        cListData:[],
        bcListData:[],
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
    methods: {
      getParams:function () {
        this.id = this.$route.query.user_id
        console.log("传来的c参数=="+this.id)
      },
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        //this.data = listJson.bcListData
        this.getParams()
        this.getbcListData()
      },
      getbcListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/user/searchCommentsByUserId',
          qs.stringify({
            userId: this.id,
          })
        ).then((response) => {
          console.log(response.data.data);
          this.cListData = response.data.data;
          for(let item of this.cListData) {
            if(item.comState!=0){
              console.log(item.userId)
              this.bcListData.push(item)
              console.log(item)
            }
          }
          this.data = this.bcListData;
          this.getlist();
        }).catch((error) => {
          console.log(error);
        });

      },
      getlist(){
        let bcListData = this.data.filter((item,index) =>
          item.comContent.includes(this.search_input)
        )
        this.bcListData=bcListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = bcListData.length
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
      },
      deleteCom(val){
        this.$axios.post('http://localhost:8080/online_answer/user/deletePersonalComment',
          qs.stringify({
            comId: val,
          })
        ).then((response) => {
          console.log(response.data.resultCode);
        }).catch((error) => {
          console.log(error);
        });
        location.reload()
      },
      modifyCom(val){
        let self = this;
      },
      checkDetail(val){
        window.location.href='/questionPage'
        console.log(val)
      },
      formatState(row, column) {
        if (row.comState === 0) {
          return '未屏蔽'
        } else if (row.comState === 1) {
          return '管理员屏蔽'
        } else if (row.comState === 2) {
          return '因回答者被拉黑而被屏蔽'
        } else if (row.comState === 3) {
          return '因问题被屏蔽而被屏蔽'
        } else if (row.comState === 4) {
          return '因回答被屏蔽而被屏蔽'
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
