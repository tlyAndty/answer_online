<template>
  <div class="top">
    <span style="font-size: 30px;">问题列表</span>
    <!--div style="margin-top: 20px">
      <el-row>
        <el-col :span="6">
          <el-cascader
            v-model="value"
            style="width: 200px;float: left;margin-left: 20px"
            :options="options"
            @change="selectChange"
          >
          </el-cascader>
        </el-col>
        <el-col :span="11">
          <a style="float: left;text-decoration: none;color: #999;margin-left: 10px;line-height: 40px" href="javascript:history.go(0)">重置</a>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 140px" v-model="search_input" placeholder="请输入问题标题" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="float: left" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div-->

    <div style="margin: 20px 0">
      <el-table
        class="questionList"
        :data="qListData"
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
          prop="quesAnsNum"
          label="被收藏数"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="quesAnsState"
          label="问题解决状态"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
          :formatter="formatAnsState"
        >

        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <a style="text-decoration: none;color: #409EFF;" @click="checkDetail(scope.row.quesId)">查看详情</a>
            <!--el-button type="text" @click="modifyQues(scope.row.quesId)">修改</el-button-->
            <!--el-button type="text" @click="deleteQues(scope.row.quesId)">删除</el-button-->
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
    name: "userQuestions",
    data() {
      return {
        qListData: [],
        bqListData:[],
        testqListData: [],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
        id:'',
        options: [{
          value: 'quesState',
          label: '问题的状态',
          children: [{
            value: '0',
            label: '未屏蔽'
          }, {
            value: '1',
            label: '管理员屏蔽'
          }, {
            value: '2',
            label: '因用户被拉黑而被屏蔽'
          }]
        },
          {
            value: 'quesAnsState',
            label: '问题的解决状态',
            children: [{
              value: '0',
              label: '未解决'
            }, {
              value: '1',
              label: '已解决'
            }, {
              value: '2',
              label: '已关闭'
            }]
          }],
        value: ''
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
        //this.data = listJson.qListData
        this.getParams()
        this.getqListData()
      },
      getqListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/user/searchQuestionsByState',
          qs.stringify({
            userId: this.id,
            quesState: '3',
          })
        ).then((response) => {
          console.log("response.data.data",response.data.data);
          this.qListData = response.data.data;
          if(this.bqListData.length!=0){
            this.bqListData.length=0
          }
          for(let item of this.qListData) {
            if(item.quesState==0){
              console.log(item.userId)
              this.bqListData.push(item)
              console.log(item)
            }
          }
          this.qListData = this.bqListData;
          console.log("this.bqListData",this.bqListData)
          /*if(this.value){
            if(this.testqListData.length==0){
              for(let item of this.qListData) {
                //console.log("item:", this.value[0])
                if(this.value[0]=='quesState'){
                  //console.log("value[0]是类型分类")
                  if(item.quesState==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testqListData.push(item)
                    console.log("item",item)
                  }
                }
                else if(this.value[0]=='quesAnsState'){
                  if(item.quesAnsState==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testqListData.push(item)
                    console.log("item",item)
                  }
                }
              }
            }else if(this.testqListData.length!=0){
              console.log("清空this.testqListData")
              this.testqListData.length=0
              for(let item of this.qListData) {
                //console.log("item:", this.value[0])
                if(this.value[0]=='quesState'){
                  //console.log("value[0]是类型分类")
                  if(item.quesState==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testqListData.push(item)
                    console.log("item",item)
                  }
                }
                else if(this.value[0]=='quesAnsState'){
                  if(item.quesAnsState==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testqListData.push(item)
                    console.log("item",item)
                  }
                }
              }
            }
            console.log("this.testqListData是",this.testqListData)
            this.data = this.testqListData
          }else {
            this.data = this.qListData
          }*/
          //this.data = this.qListData
          this.getlist();
        }).catch((error) => {
          console.log(error);
        });

      },
      getlist(){
        let qListData = this.data.filter((item,index) =>
          item.quesTitle.includes(this.search_input)
        )
        this.qListData=qListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = qListData.length
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
      deleteQues(val){
        this.$axios.post('http://localhost:8080/online_answer/user/deletePersonalQuestion',
          qs.stringify({
            quesId: val,
          })
        ).then((response) => {
          console.log(response.data.resultCode);
        }).catch((error) => {
          console.log(error);
        });
        location.reload()
      },
      modifyQues(val){
        let self = this;
      },
      checkDetail(val){
        this.$router.push({path:'/questionPage',query:{ques_id:val}})
        console.log(val)
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
        //return row.quesAnsState == 0 ? '未解决' : row.quesAnsState == 1 ? '已解决' : row.quesAnsState == 2 ? '已关闭';
        //return '已解决'
      },
      selectChange(value) {
        console.log("value0",value[0])
        console.log("value1",value[1])
        this.page = 1
        this.getqListData()
        /*if(value[0]=='reportType'){
          console.log("根据处理结果分类")
        }
        else if(value[0]=='reportState'){
          console.log("根据处理结果分类")
        }*/
      },
    },
  }
</script>

<style>
  .top{
    text-align:center;
  }
</style>

