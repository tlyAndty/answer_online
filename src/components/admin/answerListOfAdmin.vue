<template>
  <div class="top">
    <span style="font-size: 30px">回答列表</span>
    <div style="margin-top: 20px;">
      <el-row>
        <div style="float: left">
          <el-cascader
            v-model="value"
            style="width: 200px;float: left;margin-left: 20px"
            :options="options"
            @change="selectChange"
          >
          </el-cascader>
        </div>
        <div style="float: left">
          <a style="float: left;text-decoration: none;color: #999;margin-left: 10px;line-height: 40px" href="javascript:history.go(0)">重置</a>
        </div>
        <div v-if="this.value[1]==0" style="float: right;margin-right: 10px;">
          <el-button @click="blockAll">批量屏蔽</el-button>
        </div>
        <div v-if="this.value[1]==1" style="float: right;margin-right: 10px;">
          <el-button @click="unblockAll">批量取消屏蔽</el-button>
        </div>
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
        class="answerList"
        :data="aListData"
        style="width: 100%"
        :default-sort = "{prop: 'ansTime', order: 'descending'}"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          v-if="this.value[1]==0||this.value[1]==1"
        >
        </el-table-column>

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
          <template slot-scope="aListData">
            {{ aListData.row.answer.ansTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
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
            <a v-if="scope.row.answer.ansState==0" style="text-decoration: none;color: #409EFF;margin-right: 10px;" @click="blockAns(scope.row.answer.ansId)">屏蔽</a>
            <a v-if="scope.row.answer.ansState!=0" style="text-decoration: none;color: #409EFF;" @click="unblockAns(scope.row.answer.ansId,scope.row.answer.ansState)">取消屏蔽</a>
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
    name: "answerListOfAdmin",
    data() {
      return {
        aListData:[],
        testaListData:[],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
        id: '',
        options: [{
          value: 'ansState',
          label: '回答的状态',
          children: [{
            value: '0',
            label: '未屏蔽'
          }, {
            value: '1',
            label: '管理员屏蔽'
          }, {
            value: '2',
            label: '因回答者被拉黑而被屏蔽'
          }, {
            value: '3',
            label: '因问题被屏蔽而被屏蔽'
          }]
        }],
        value: '',
        multipleSelection:[],
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
        this.getaListData()
      },
      getaListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/admin/searchAnswersByState',
          qs.stringify({
            ansState: '4',
          })
        ).then((response) => {
          console.log("Adata:",response.data.data);
          this.aListData = response.data.data;
          console.log("this.value:", this.value)
          if(this.value){
            if(this.testaListData.length!=0){
              console.log("清空this.testaListData")
              this.testaListData.length=0
            }
            for(let item of this.aListData) {
              //console.log("item:", item)
              if(this.value[0]=='ansState'){
                //console.log("value[0]是类型分类")
                if(item.answer.ansState==this.value[1]) {
                  console.log("value[1]是",this.value[1])
                  this.testaListData.push(item)
                  console.log("item:",item.answer)
                }
              }
            }
            console.log("this.testaListData是",this.testaListData)
            for(var i=0;i<this.testaListData.length;i++){
              var ansContenttest=this.testaListData[i].answer.ansContent.replace(/<[^>]+>/g, "")
              console.log("ansContenttest",ansContenttest)
              this.testaListData[i].answer.ansContent=ansContenttest
              console.log("this.testaListData[i].ansContent",this.testaListData[i].answer.ansContent)
            }
            this.data = this.testaListData
          }else {
            for(var i=0;i<this.aListData.length;i++){
              var ansContenttest=this.aListData[i].answer.ansContent.replace(/<[^>]+>/g, "")
              console.log("ansContenttest",ansContenttest)
              this.aListData[i].answer.ansContent=ansContenttest
              console.log("this.aListData[i].ansContent",this.aListData[i].answer.ansContent)
            }
            this.data = this.aListData
          }
          //this.data=this.aListData
          console.log("this.data:",this.data)
          //console.log("total1:",this.data.length)
          this.getlist()
        }).catch((error) => {
          console.log(error);
        });

      },
      getlist(){
        let aListData = this.data.filter((item,index) =>
          item.answer.ansContent.includes(this.search_input)
        )
        this.aListData=aListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
          //console.log(index,index < this.page * this.limit && index >= this.limit * (this.page - 1))
        )
        this.total = aListData.length
       //console.log("total2:",aListData.length)
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
      },
      unblockAns(val1,val2){
        if(val2==1) {
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

      },
      blockAll(){
        if(this.multipleSelection.length==0){
          alert("您没有选择任何回答")
        }
        else {
          console.log("要屏蔽的回答有",this.multipleSelection)
          this.$confirm('此操作将屏蔽回答, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for(var i=0;i<this.multipleSelection.length;i++){
              console.log(this.multipleSelection[i].answer.ansId)
              this.$axios.post('http://localhost:8080/online_answer/admin/modifyAnswerState',
                qs.stringify({
                  ansId: this.multipleSelection[i].answer.ansId,
                  ansState: '1',
                })
              ).then((response) => {
                console.log(response.data)
                console.log("修改成功")
              }).catch((error) => {
                console.log(error);
              });
            }
            alert("屏蔽成功")
            history.go(0)
          }).catch(() => {
          });
        }
      },
      unblockAll(){
        if(this.multipleSelection.length==0){
          alert("您没有选择任何评论")
        }
        else {
          console.log("要取消屏蔽的评论有",this.multipleSelection)
          this.$confirm('此操作将取消屏蔽评论, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for(var i=0;i<this.multipleSelection.length;i++){
              console.log(this.multipleSelection[i].answer.ansId)
              this.$axios.post('http://localhost:8080/online_answer/admin/modifyAnswerState',
                qs.stringify({
                  ansId: this.multipleSelection[i].answer.ansId,
                  ansState: '0',
                })
              ).then((response) => {
                console.log(response.data)
                console.log("修改成功")
              }).catch((error) => {
                console.log(error);
              });
            }
            alert("取消屏蔽成功")
            history.go(0)
          }).catch(() => {
          });
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log("this.multipleSelection",this.multipleSelection)
      },
      selectChange(value) {
        console.log("value0",value[0])
        console.log("value1",value[1])
        this.page = 1
        this.getaListData()
      },
    },

  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
