<template>
  <div class="top">
    <span style="font-size: 30px">注册用户列表</span>
    <div class="span1" style="text-align: right; font-size: 16px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 5px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="orderById">用户名字</el-dropdown-item>
          <el-dropdown-item @click.native="orderByTime">注册时间</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="margin-right: 15px">排序</span>
    </div>
    <el-table
      class="registerList"
      :data="rListData"
      style="width: 100%">

      <el-table-column
        prop="name"
        label="用户名字"
        header-align="left"
        align="left"
        :show-overflow-tooltip="true">
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
        prop="pwd"
        label="用户密码"
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
      name: "registrationAudit",
      data() {
        return {
          rListData:[{
            name:'小明',
            mail:'1@qq.com',
            pwd:'123',
            add_time:'2020-03-27 13:07:40',
          },
            {
              name:'小明',
              mail:'1@qq.com',
              pwd:'123',
              add_time:'2020-03-27 13:07:40',
            },
            {
              name:'小明',
              mail:'1@qq.com',
              pwd:'123',
              add_time:'2020-03-27 13:07:40',
            }],
        }
      },
      mounted(){
        this.getrListData();
      },
      methods: {
        getrListData:function() {
          this.$axios.get(
            '127.0.0.1/online_answer/user/login'
          ).then(response => {
            const res = response.data
            if (res.data) {
              const data = res.data
              this.rListData = data.rListData
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
              this.rListData = data.rListData
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
              this.rListData = data.rListData
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
