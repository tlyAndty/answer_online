<template>
  <div class="top">
    <span style="font-size: 30px">用户列表</span>
    <div class="span1" style="text-align: right; font-size: 16px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 5px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="orderById">用户id</el-dropdown-item>
          <el-dropdown-item @click.native="orderByTime">注册时间</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="margin-right: 15px">排序</span>
    </div>
    <el-table
      class="userList"
      :data="uListData"
      style="width: 100%">

      <el-table-column
        prop="user_id"
        label="用户id"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="mail"
        label="用户邮箱"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="用户名字"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>



      <el-table-column
        prop="state"
        label="用户状态"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        prop="add_time"
        label="注册时间"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
      </el-table-column>


    </el-table>
  </div>
</template>

<script>
    export default {
      name: "userList",
      data() {
        return {
          uListData:[{
            user_id:'1',
            mail:'1@qq.com',
            name:'小明',
            state:'0',
            add_time:'2020-03-27 13:07:40',
          },
            {
              user_id:'2',
              mail:'1@qq.com',
              name:'小明',
              state:'0',
              add_time:'2020-03-27 13:07:40',
            },
            {
              user_id:'3',
              mail:'1@qq.com',
              name:'小明',
              state:'0',
              add_time:'2020-03-27 13:07:40',
            }],
        }
      },
      mounted(){
        this.getuListData();
      },
      methods: {
        getuListData:function() {
          this.$axios.get(
            '127.0.0.1/online_answer/user/login'
          ).then(response => {
            const res = response.data
            if (res.data) {
              const data = res.data
              this.uListData = data.uListData
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
              this.uListData = data.uListData
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
              this.uListData = data.uListData
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
