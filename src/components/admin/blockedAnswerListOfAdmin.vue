<template>
  <div class="top">
    <span style="font-size: 30px">被屏蔽回答列表</span>
    <div style="margin-top: 20px;">
      <el-row>
        <div style="float: right;margin-right:20px;">
          <el-button style="float: left" @click="search">搜索</el-button>
        </div>
        <div style="float: right;margin-right: 10px;">
          <el-input style="width: 140px" v-model="search_input" placeholder="请输入回答者" ></el-input>
        </div>
      </el-row>
    </div>
    <div style="margin: 10px 0">
      <el-table
        class="blockedAnswerList"
        :data="baListData"
        style="width: 100%"
        :default-sort = "{prop: 'ansTime', order: 'descending'}">

        <el-table-column
          label="回答id"
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
          label="回答者"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="answer.ansContent"
          label="回答内容"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="answer.ansTime"
          label="发布的时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="baListData">
            {{ baListData.row.answer.ansTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

        <el-table-column
          sortable
          prop="answer.ansComNum"
          label="评论个数"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="answer.bestAnswer"
          label="是否是最佳回答"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
          :formatter="formatBestAnswer"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="answer.ansState"
          label="回答状态"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
          :formatter="formatState"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="answer.goodCount"
          label="赞的个数"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="answer.badCount"
          label="踩的个数"
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
            <a style="text-decoration: none;color: #409EFF;margin-right: 10px;" @click="unblockAns(scope.row.answer.ansId,scope.row.answer.ansState)">取消屏蔽</a>
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
    name: "blockedAnswerListOfAdmin",
    data() {
      return {
        aListData:[],
        baListData:[],
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
        this.getbaListData()
      },
      getbaListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/admin/searchAnswersByState',
          qs.stringify({
            ansState: '4',
          })
        ).then((response) => {
          console.log("Adata:",response.data.data);
          this.aListData = response.data.data;
          //this.data=this.aListData
          //console.log("this.data:",this.data)
          //console.log("total1:",this.data.length)
          for(let item of this.aListData) {
            console.log(item.answer.ansId)
            console.log("回答状态:", item.answer.ansState)
            if(item.answer.ansState!=0) {
              console.log("被屏蔽的回答")
              this.baListData.push(item)
              console.log("item:", item)
            }
          }
          this.data = this.baListData;
          console.log("this.baListData:",this.baListData)
          this.getlist()
        }).catch((error) => {
          console.log(error);
        });
      },
      getlist(){
        let baListData = this.data.filter((item,index) =>
          item.user_name.includes(this.search_input)
        )
        this.baListData=baListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
          //console.log(index,index < this.page * this.limit && index >= this.limit * (this.page - 1))
        )
        this.total = baListData.length
        //console.log("total2:",baListData.length)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.getaListData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getbaListData()
      },
      search() {
        this.page = 1
        this.getbaListData()
      },
      unblockAns(val1,val2){
        if(val2==1){
          this.$axios.post('http://localhost:8080/online_answer/admin/modifyAnswerState',
            qs.stringify({
              ansId: val1,
              ansState: '0',
            })
          ).then((response) => {
            console.log(response.data.resultCode)
            console.log("修改成功")
            alert("取消屏蔽成功")
            history.go(0)
          }).catch((error) => {
            console.log(error);
          });
        }
        else {
          alert("不属于被管理员屏蔽，无法取消屏蔽")
        }

        //location.reload()
      },
      blockAns(val){
        this.$axios.post('http://localhost:8080/online_answer/admin/modifyAnswerState',
          qs.stringify({
            ansId: val,
            ansState: '1',
          })
        ).then((response) => {
          console.log(response.data.resultCode)
          console.log("修改成功")
          alert("屏蔽成功")
          history.go(0)
        }).catch((error) => {
          console.log(error);
        });
        //location.reload()
      },
      formatBestAnswer(row, column) {
        if (row.answer.bestAnswer === 0) {
          return '否'
        } else if (row.answer.bestAnswer === 1) {
          return '是'
        }
      },
      formatState(row, column) {
        if (row.answer.ansState === 0) {
          return '未屏蔽'
        } else if (row.answer.ansState === 1) {
          return '管理员屏蔽'
        } else if (row.answer.ansState === 2) {
          return '因回答者被拉黑而被屏蔽'
        } else if (row.answer.ansState === 3) {
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
