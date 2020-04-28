<template>
  <div class="top">
    <span style="font-size: 30px">屏蔽回答列表</span>
    <div>
      <el-row>
        <el-col :span="4">
          <el-input v-model="search_input" placeholder="请输入回答标题" ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="search">搜索</el-button>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div>

    <div style="margin: 20px 0">
      <el-table
      class="blockedAnswerList"
      :data="baListData"
      style="width: 100%"
      :default-sort = "{prop: 'ansTime', order: 'descending'}">

      <el-table-column
        sortable
        prop="ansId"
        label="回答id"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        sortable
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
        <template slot-scope="baListData">
          {{ baListData.row.ansTime | dateFmt('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="goodCount"
        label="赞的个数"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        sortable
        prop="badCount"
        label="踩的个数"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        sortable
        prop="ansState"
        label="回答的状态"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope.row.phone)">查看详情</el-button>
            <el-button type="text" @click="modifyUser(scope.row.phone)">修改</el-button>
            <el-button type="text" @click="deleteUser(scope.row.phone)">删除</el-button>
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
    baListData: [/*{
      ans_id:'1',
      ans_content:'内容a',
      ans_time:'2020-03-27 13:07:40',
      good_count:'1',
      bad_count:'2',
      ans_state:'0',
    },
      {
        ans_id:'2',
        ans_content:'内容g',
        ans_time:'2020-03-24 13:07:40',
        good_count:'1',
        bad_count:'2',
        ans_state:'0',
      },
      {
        ans_id:'3',
        ans_content:'内容w',
        ans_time:'2020-03-21 13:07:40',
        good_count:'1',
        bad_count:'2',
        ans_state:'0',
      }*/],
  }
  export default {
    name: "blockedAnswerList",
    data() {
      return {
        baListData:[],
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
    /*
    mounted(){
      this.getbaListData();
    },*/
    methods: {
      getParams:function () {
        this.id = this.$route.query.user_id
        console.log("传来的a参数=="+this.id)
      },
      pageList() {
        // 发请求拿到数据并暂存全部数据,方便之后操作
        this.data = listJson.baListData
        this.getParams()
        this.getbaListData()
      },
      getbaListData:function() {
        this.$axios.post('http://localhost:8080/online_answer/user/searchAnswersByUserId',
          qs.stringify({
            userId: this.id,
          })
        ).then((response) => {
          console.log(response.data.data);
          this.aListData = response.data.data;
          for(let item of this.aListData) {
            if(item.ansState!=0){
              console.log(item.userId)
              this.baListData.push(item)
              console.log(item)
            }
          }
        }).catch((error) => {
          console.log(error);
        });
        let baListData = this.data.filter((item,index) =>
          item.ans_content.includes(this.search_input)
        )
        this.baListData=baListData.filter((item,index)=>
          index < this.page * this.limit && index >= this.limit * (this.page - 1)
        )
        this.total = baListData.length
        /*this.$axios.get(
          '127.0.0.1/online_answer/user/login'
        ).then(response => {
          const res = response.data
          if (res.data) {
            const data = res.data
            this.baListData = data.baListData
          }
        }).catch(error => {
          console.log('错误信息：' + error)
        })*/
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.getbaListData()
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
      deleteUser(val){
        console.log(val)

//这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等
      },
      modifyUser(val){
        let self = this;
      },
      checkDetail(val){
        window.location.href='/questionPage'
        console.log(val)
      },
    }

  }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
