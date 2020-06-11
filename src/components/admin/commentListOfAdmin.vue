<template>
  <div class="top">
    <span style="font-size: 30px">所有评论列表</span>
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
        <div style="float: right;margin-right:20px;">
          <el-button style="float: left" @click="search">搜索</el-button>
        </div>
        <div style="float: right;margin-right: 10px;">
          <el-input style="width: 140px" v-model="search_input" placeholder="请输入评论者" ></el-input>
        </div>
      </el-row>
    </div>
    <div style="margin: 10px 0">
      <el-table
        class="commentList"
        :data="cListData"
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
          <template slot-scope="cListData">
            {{ cListData.row.comment.comTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
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
          sortable
          prop="comment.comState"
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
            <a v-if="scope.row.comment.comState==0" style="text-decoration: none;color: #409EFF;margin-right: 10px;" @click="blockCom(scope.row.comment.comId)">屏蔽</a>
            <a v-if="scope.row.comment.comState!=0" style="text-decoration: none;color: #409EFF;" @click="unblockCom(scope.row.comment.comId,scope.row.comment.comState)">取消屏蔽</a>
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
        testcListData:[],
        data: [],
        search_input: '',
        timeout: null,
        limit: 5,
        total: null,
        page:1,
        id: '',
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
        this.getcListData()
      },
      getcListData: function () {
        this.$axios.post('http://localhost:8080/online_answer/admin/searchCommentsByState',
          qs.stringify({
            comState: '5',
          })
        ).then((response) => {
          console.log("Cdata:",response.data.data);
          this.cListData = response.data.data;
          if(this.value){
            if(this.testcListData.length!=0){
              console.log("清空this.testcListData")
              this.testcListData.length=0
            }
            for(let item of this.cListData) {
              //console.log("item:", this.value[0])
              if(this.value[0]=='comState'){
                //console.log("value[0]是类型分类")
                if(item.comment.comState==this.value[1]) {
                  console.log("value[1]是",this.value[1])
                  this.testcListData.push(item)
                  console.log("item",item)
                }
              }
            }
            console.log("this.testcListData是",this.testcListData)
            this.data = this.testcListData
          }else {
            this.data = this.cListData
          }
          //this.data=this.cListData
          console.log("this.data:",this.data)
          console.log("total1:",this.data.length)
          this.getlist()
        }).catch((error) => {
          console.log(error);
        });

      },
      getlist(){
        let cListData = this.data.filter((item,index) =>
          item.user_name.includes(this.search_input)
        )
        this.cListData=cListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
          //console.log(index,index < this.page * this.limit && index >= this.limit * (this.page - 1))
        )
        this.total = cListData.length
        console.log("total2:",cListData.length)
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
      unblockCom(val1,val2){
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
      blockCom(val){
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
      formatState(row, column) {
        if (row.comment.comState === 0) {
          return '未屏蔽'
        } else if (row.comment.comState === 1) {
          return '管理员屏蔽'
        } else if (row.comment.comState === 2) {
          return '因回答者被拉黑而被屏蔽'
        } else if (row.comment.comState === 3) {
          return '因问题被屏蔽而被屏蔽'
        } else if (row.comment.comState === 4){
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

    },

  }
</script>

<style scoped>
  .top{
    text-align:center;
  }

</style>
