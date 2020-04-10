<template>
  <div class="top">
    <span style="font-size: 30px">屏蔽问题列表</span>
    <div class="span1" style="text-align: right; font-size: 16px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 5px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="orderById">问题id</el-dropdown-item>
          <el-dropdown-item @click.native="orderByTime">发布的最新时间</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="margin-right: 15px">排序</span>
    </div>
    <el-table
      class="blockedQuestionList"
      :data="bqListData"
      style="width: 100%">

      <el-table-column
        prop="ques_id"
        label="问题id"
        header-align="left"
        align="left"
      >
      </el-table-column>

      <el-table-column
        prop="ques_title"
        label="问题标题"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="ques_time"
        label="发布的最新时间"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>


      <el-table-column
        prop="ques_ans_state"
        label="问题解决状态"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="ques_state"
        label="问题状态"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
    export default {
        name: "blockedQuestionListOfAdmin",
      data() {
        return {
          bqListData:[{
            ques_id:'1',
            ques_title:'hhh',
            ques_time:'2011',
            ques_ans_state:'1',
            ques_state:'2',
          },
            {
              ques_id:'2',
              ques_title:'hhh',
              ques_time:'2011',
              ques_ans_state:'1',
              ques_state:'2',
            },
            {
              ques_id:'3',
              ques_title:'hhh',
              ques_time:'2011',
              ques_ans_state:'1',
              ques_state:'2',
            }],
        }
      },
      mounted(){
        this.getbqListData();
      },
      methods: {
        getbqListData:function() {
          this.$axios.get(
            '127.0.0.1/online_answer/user/login'
          ).then(response => {
            const res = response.data
            if (res.data) {
              const data = res.data
              this.bqListData = data.bqListData
            }
          }).catch(error => {
            console.log('错误信息：' + error)
          })
        },
        orderById:function () {
          this.$axios.get(
            '127.0.0.1/online_answer/user/login'
          ).then(response => {
            const res = response.data
            if (res.data) {
              const data = res.data
              this.bqListData = data.bqListData
            }
          }).catch(error => {
            console.log('错误信息：' + error)
          })
        },
        orderByTime:function () {
          this.$axios.get(
            '127.0.0.1/online_answer/user/login'
          ).then(response => {
            const res = response.data
            if (res.data) {
              const data = res.data
              this.bqListData = data.bqListData
            }
          }).catch(error => {
            console.log('错误信息：' + error)
          })
        },

      }
    }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
