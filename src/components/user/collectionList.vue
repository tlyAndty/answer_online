<template>
  <div class="top">
    <span style="font-size: 30px;">收藏列表</span>
    <div>
      <el-row>
        <div  style="float: right;margin-right: 10px;">
          <el-button @click="delectAll">取消收藏</el-button>
        </div>
        <div style="float: right;margin-right:20px;">
          <el-button style="float: left" @click="search">搜索</el-button>
        </div>
        <div style="float: right;margin-right: 10px;">
          <el-input style="width: 140px" v-model="search_input" placeholder="请输入问题标题" ></el-input>
        </div>
      </el-row>
    </div>

    <div style="margin: 20px 0">
      <el-table
        class="collectionList"
        :data="colListData"
        style="width: 100%"
        :default-sort = "{prop: 'quesTime', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >

        <el-table-column
          type="selection"
        >
        </el-table-column>

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
          :show-overflow-tooltip="true"
          :formatter="formatAnsState"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="quesState"
          label="问题状态"
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
            <a style="text-decoration: none;color: #409EFF;margin-right: 10px;" @click="checkDetail(scope.row.quesId)">查看详情</a>
            <a style="text-decoration: none;color: #409EFF;" @click="deleteCol(scope.row.quesId)">取消收藏</a>
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
        multipleSelection: []
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
        this.id = this.$route.query.user_id
        console.log("传来的u参数=="+this.id)
      },
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        //this.data = listJson.colListData
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
          this.data = this.colListData;
          this.getlist();
        }).catch((error) => {
          console.log(error);
        });
      },
      getlist(){
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
          alert("取消收藏成功")
          history.go(0)
        }).catch((error) => {
          console.log(error);
        });
        console.log("colUserId:",this.id)
        console.log("colQuesId:",val)

      },
      checkDetail(val){
        this.$router.push({path:'/questionPage',query:{ques_id:val}})
        console.log(val)
      },
      formatAnsState(row, column){
        if(row.quesAnsState=== 0){
          return '未解决'
        }
        else if(row.quesAnsState === 1){
          return '已解决'
        }
        else if(row.quesAnsState === 2){
          return '已关闭'
        }
      },
      formatState(row, column) {
        if (row.quesState === 0) {
          return '未屏蔽'
        } else if (row.quesState === 1) {
          return '管理员屏蔽'
        } else if (row.quesState === 2) {
          return '因用户被拉黑而被屏蔽'
        }
      },
      delectAll(){
        if(this.multipleSelection.length==0){
          alert("您没有选择任何问题")
        }
        else {
          console.log("要删除掉的收藏有",this.multipleSelection)
          this.$confirm('此操作将删除收藏, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for(var i=0;i<this.multipleSelection.length;i++){
              console.log(this.multipleSelection[i].quesId)
              this.$axios.post('http://localhost:8080/online_answer/user/deleteCollections',
                qs.stringify({
                  colUserId: this.id,
                  colQuesId: this.multipleSelection[i].quesId,
                })
              ).then((response) => {
                console.log(response.data.resultCode);
              }).catch((error) => {
                console.log(error);
              });
            }
            alert("删除成功")
            history.go(0)
          }).catch(() => {
          });
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log("this.multipleSelection",this.multipleSelection)
      },
    },
  }
</script>

<style>
  .top{
    text-align:center;
  }
</style>

