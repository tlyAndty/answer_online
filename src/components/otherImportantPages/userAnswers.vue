<template>
  <div class="top">
    <span style="font-size: 30px">回答列表</span>
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
          <el-input style="width: 140px" v-model="search_input" placeholder="请输入回答内容" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="float: left" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div-->

    <div style="margin: 20px 0">
      <el-table
        class="answerList"
        :data="aListData"
        style="width: 100%"
        :default-sort = "{prop: 'ans_time', order: 'descending'}">

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
          prop="ansContent"
          label="回答内容"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="ansTime"
          label="回答发布时间"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="aListData">
            {{ aListData.row.ansTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

        <el-table-column
          sortable
          prop="goodCount"
          label="点赞数"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          sortable
          prop="badCount"
          label="点踩数"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          sortable
          prop="bestAnswer"
          label="是否是最佳答案"
          header-align="left"
          align="left"
          :show-overflow-tooltip="true"
          :formatter="formatBestAnswer"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <a style="text-decoration: none;color: #409EFF;" @click="checkDetail(scope.row.quesId)">查看详情</a>
            <!--el-button type="text" @click="checkDetail(scope.row.ansId)">查看详情</el-button-->
            <!--el-button type="text" @click="modifyAns(scope.row.ansId,scope.row.ansContent)">查看详情</el-button-->
            <!--el-button type="text" @click="deleteAns(scope.row.ansId)">删除</el-button-->
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
    name: "userAnswer",
    data() {
      return {
        aListData:[],
        baListData:[],
        testaListData:[],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
        id:'',
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
        value: ''
      }
    },
    created() {
      this.pageList()
    },
    methods: {
      getParams:function () {
        this.id = this.$route.query.user_id
        console.log("传来的a参数=="+this.id)
      },
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        //this.data = listJson.aListData
        this.getParams()
        this.getaListData()
      },
      getaListData:function() {
        this.$axios.post('http://localhost:8080/online_answer/user/searchAnswersByState',
          qs.stringify({
            userId: this.id,
            ansState:'4',
          })
        ).then((response) => {
          console.log(response.data.data);
          this.aListData = response.data.data;
          if(this.baListData.length!=0){
            this.baListData.length=0
          }
          for(let item of this.aListData) {
            if(item.ansState==0){
              //console.log(item.userId)
              this.baListData.push(item)
              //console.log(item)
            }
          }
          this.aListData = this.baListData;
          console.log("this.baListData",this.baListData)
          /*if(this.value){
            if(this.testaListData.length==0){
              for(let item of this.aListData) {
                //console.log("item:", this.value[0])
                if(this.value[0]=='ansState'){
                  //console.log("value[0]是类型分类")
                  if(item.ansState==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testaListData.push(item)
                    console.log("item",item)
                  }
                }
              }
            }else if(this.testaListData.length!=0){
              console.log("清空this.testuListData")
              this.testaListData.length=0
              for(let item of this.aListData) {
                //console.log("item:", this.value[0])
                if(this.value[0]=='ansState'){
                  //console.log("value[0]是类型分类")
                  if(item.ansState==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testaListData.push(item)
                    console.log("item",item)
                  }
                }
              }
            }
            console.log("this.testaListData是",this.testaListData)
            this.data = this.testaListData
          }else {
            this.data = this.aListData
          }*/
          for(var i=0;i<this.aListData.length;i++){
            var ansContenttest=this.aListData[i].ansContent.replace(/<[^>]+>/g, "")
            console.log("ansContenttest",ansContenttest)
            this.aListData[i].ansContent=ansContenttest
            console.log("this.aListData[i].ansContent",this.aListData[i].ansContent)
          }
          console.log("this.aListData",this.aListData)
          this.data = this.aListData;
          this.getlist();
        }).catch((error) => {
          console.log(error);
        });

      },
      getlist(){
        let aListData = this.data.filter((item,index) =>
          item.ansContent.includes(this.search_input)
        )
        this.aListData=aListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = aListData.length
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
      deleteAns(val){
        this.$axios.post('http://localhost:8080/online_answer/user/deletePersonalAnswer',
          qs.stringify({
            ansId: val,
          })
        ).then((response) => {
          console.log(response.data.resultCode);
        }).catch((error) => {
          console.log(error);
        });
        location.reload()
      },
      modifyAns(val1,val2){
        this.$router.push({path:'/answerInfo',query:{ans_id:val1,ans_content:val2,user_id:this.id}})
        console.log(val1)
      },
      checkDetail(val){
        this.$router.push({path:'/questionPage',query:{ques_id:val}})
        console.log(val)
      },
      formatBestAnswer(row, column) {
        if (row.bestAnswer === 0) {
          return '否'
        } else if (row.bestAnswer === 1) {
          return '是'
        }
      },
      selectChange(value) {
        console.log("value0",value[0])
        console.log("value1",value[1])
        this.page = 1
        this.getaListData()
        /*if(value[0]=='reportType'){
          console.log("根据处理结果分类")
        }
        else if(value[0]=='reportState'){
          console.log("根据处理结果分类")
        }*/
      },
    }
  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
