<template>
  <div class="top">
    <span style="font-size: 30px">发出的评论列表</span>
    <div style="margin-top: 20px">
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
        <div style="float: right;margin-right:20px;">
          <el-button style="float: left" @click="search">搜索</el-button>
        </div>
        <div style="float: right;margin-right: 10px;">
          <el-input style="width: 140px" v-model="search_input" placeholder="请输入评论内容" ></el-input>
        </div>
      </el-row>
    </div>

    <div style="margin: 20px 0">
      <el-table
      class="commentList"
      :data="cListData"
      style="width: 100%"
      :default-sort = "{prop: 'com_time', order: 'descending'}">

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
          <!--el-button type="text" @click="modifyCom(scope.row.comId,scope.row.comContent)">查看详情</el-button-->
          <a style="text-decoration: none;color: #409EFF;" @click="deleteCom(scope.row.comId)">删除</a>
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
    name: "commentList",
    data() {
      return {
        cListData:[],
        testcListData:[],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
        id:'',
        options: [{
          value: 'comState',
          label: '评论的状态',
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
          }, {
            value: '4',
            label: '因回答被屏蔽而被屏蔽'
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
        console.log("传来的c参数=="+this.id)
      },
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        //this.data = listJson.cListData
        this.getParams()
        this.getcListData()
      },
      getcListData:function() {
        this.$axios.post('http://localhost:8080/online_answer/user/searchCommentsByState',
          qs.stringify({
            userId: this.id,
            comState:'5'
          })
        ).then((response) => {
          console.log(response.data.data);
          this.cListData = response.data.data;
          if(this.value){
            if(this.testcListData.length==0){
              for(let item of this.cListData) {
                //console.log("item:", this.value[0])
                if(this.value[0]=='comState'){
                  //console.log("value[0]是类型分类")
                  if(item.comState==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testcListData.push(item)
                    console.log("item",item)
                  }
                }
              }
            }else if(this.testcListData.length!=0){
              console.log("清空this.testcListData")
              this.testcListData.length=0
              for(let item of this.cListData) {
                //console.log("item:", this.value[0])
                if(this.value[0]=='comState'){
                  //console.log("value[0]是类型分类")
                  if(item.comState==this.value[1]) {
                    console.log("value[1]是",this.value[1])
                    this.testcListData.push(item)
                    console.log("item",item)
                  }
                }
              }
            }
            console.log("this.testcListData是",this.testcListData)
            this.data = this.testcListData
          }else {
            this.data = this.cListData
          }
          //this.data = this.cListData;
          this.getlist();
        }).catch((error) => {
          console.log(error);
        });

      },
      getlist(){
        let cListData = this.data.filter((item,index) =>
          item.comContent.includes(this.search_input)
        )
        this.cListData=cListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = cListData.length
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
      modifyCom(val1,val2){
        this.$router.push({path:'/commentInfo',query:{com_id:val1,com_content:val2,user_id:this.id}})
        console.log(val1)
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
      },
      selectChange(value) {
        console.log("value0",value[0])
        console.log("value1",value[1])
        this.page = 1
        this.getcListData()
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
