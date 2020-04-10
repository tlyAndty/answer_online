<template>
  <div class="hometext">
    <h1>主页面</h1>
    欢迎进入answer_online!
    <div style="margin: 30px">
      <div class="time_order" style="float: left;width: 50%">
      <el-table
        class="questionList"
        :data="qListData"
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

      </el-table>
      </div>

      <div class="good_order" style="float: right;width: 40%">
        <el-table
          class="questionList"
          :data="qListData"
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

        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'mainpage',
  }
</script>

<style>
  .el-button{
    background-color: lightcoral;
    color: white;
  }
  .hometext{
    text-align:center;
  }
</style>
