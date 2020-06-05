<template>
  <div class="top">
    <span style="font-size: 30px">被屏蔽评论列表</span>
    <div style="margin-top: 20px;">
      <el-row>
        <el-col :span="4">
          <el-input style="width: 140px;margin-left: 20px" v-model="search_input" placeholder="请输入评论者" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="float: left;margin-left: 20px" @click="search">搜索</el-button>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div>
    <div style="margin: 10px 0">
      <el-table
        class="commentList"
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
          prop="user_name"
          label="评论者"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="comment.comContent"
          label="回答内容"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="comment.comTime"
          label="发布的时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="bcListData">
            {{ bcListData.row.comment.comTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

        <el-table-column
          sortable
          prop="comment.ansComId"
          label="回复的评论id"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="unblockCom(scope.row.comment.comId)">取消屏蔽</el-button>
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
    name: "commentListOfAdmin",
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
        //this.data = this.qListData
        this.getParams()
        this.getbcListData()
      },
      getbcListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/admin/searchCommentsByState',
          qs.stringify({
            comState: '5',
          })
        ).then((response) => {
          console.log("Cdata:",response.data.data);
          this.cListData = response.data.data;
          for(let item of this.cListData) {
            console.log(item.comment.comId)
            console.log("评论状态:", item.comment.comState)
            if(item.comment.comState!=0) {
              console.log("被屏蔽的评论")
              this.bcListData.push(item)
              console.log("item:", item)
            }
          }
          this.data = this.bcListData;
          console.log("this.bcListData:",this.bcListData)
          this.getlist()
        }).catch((error) => {
          console.log(error);
        });

      },
      getlist(){
        let bcListData = this.data.filter((item,index) =>
          item.user_name.includes(this.search_input)
        )
        this.bcListData=bcListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
          //console.log(index,index < this.page * this.limit && index >= this.limit * (this.page - 1))
        )
        this.total = bcListData.length
        console.log("total2:",bcListData.length)
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
      unblockCom(val){
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyAnswerState',
          qs.stringify({
            ansId: val,
            ansState: '0',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          console.log("修改成功")
        }).catch((error) => {
          console.log(error);
        });
        location.reload()
      },
      blockCom(val){
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyAnswerState',
          qs.stringify({
            ansId: val,
            ansState: '1',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          console.log("修改成功")
        }).catch((error) => {
          console.log(error);
        });
        location.reload()
      },
      formatState(row, column) {
        if (row.comment.comState === 0) {
          return '未屏蔽'
        } else if (row.comment.comState === 1) {
          return '管理员屏蔽'
        } else if (row.comment.comState === 2) {
          return '因回答者被拉黑而被屏蔽'
        } else if (row.comment.comState === 3) {
          return '因问题被屏蔽而被屏蔽'
        }

      }

    },

  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
