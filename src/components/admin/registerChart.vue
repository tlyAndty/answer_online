<template>
  <div class="top">
    <span style="font-size: 30px">注册数据</span>
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
      </el-row>
      <el-row>
        <div v-if="value[1]==0">
          <el-date-picker
            v-model="selectedYear"
            value-format="yyyy"
            type="year"
            placeholder="选择年"
            style="float: left;width: 200px;margin-left: 20px;margin-top: 10px"
            @change="getChartData()">
          </el-date-picker>
        </div>
        <div v-if="value[1]==1">
          <el-date-picker
            v-model="selectedDay"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="float: left;width: 200px;margin-left: 20px;margin-top: 10px"
            @change="getChartData()">
          </el-date-picker>
        </div>
      </el-row>
    </div>
    <div id="chartLineBox" style="width: 700px;height:300px;margin: 0 auto;margin-top: 30px">
    </div>
    <div v-if="value[1]!=1" style="color: lightcoral;font-size: 20px">
      <span>{{this.selectedYear}}年数据</span>
      <span style="margin-left: 30px">总量：{{this.yearData.all}}</span>
    </div>
    <div v-if="value[1]==1" style="color: lightcoral;font-size: 18px">
      <span>自{{this.selectedDay}}起的一周数据</span>
      <span style="margin-left: 30px">总量：{{this.dayData.all}}</span>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import echarts from 'echarts'
    export default {
      name: "registerChart",
      data(){
        return{
          options: [{
            value: 'period',
            label: '周期',
            children: [{
              value: '0',
              label: '年'
            }, {
              value: '1',
              label: '周'
            }]
          }],
          value: '',
          option:[],
          selectedYear:'2020',
          yearData:[],
          selectedDay:'',
          dayData:[],
        }
      },
      mounted(){
        this.getChartData()

        this.selectedDay = new Date();
        let date = {
          year: this.selectedDay.getFullYear(),
          month: this.selectedDay.getMonth() + 1,
          date: this.selectedDay.getDate(),
        }
        console.log(date);
        this.selectedDay = date.year + '-' + 0 + date.month + '-' + date.date;

        this.chartLine = echarts.init(document.getElementById('chartLineBox'));
        this.chartLine.setOption(this.option);
        window.onresize = function () {
          this.chartLine.resize()
        }
        console.log("画一次图")
        console.log("selectedYear",this.selectedYear)
      },
      methods: {
        getChartData() {
          this.option = {
            tooltip: {              //设置tip提示
              trigger: 'axis'
            },
            legend: {               //设置区分（哪条线属于什么）
              data: ['注册量']
            },
            color: ['#f08181'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
              type: 'category',
              boundaryGap: false,     //坐标轴两边不留白
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              name: '日期',           //X轴 name
              nameTextStyle: {        //坐标轴名称的文字样式
                color: '#666',
                fontSize: 16,
                padding: [0, 0, 0, 20]
              },
              axisLine: {             //坐标轴轴线相关设置。
                lineStyle: {
                  color: '#666',
                }
              }
            },
            yAxis: {
              name: '人数',
              nameTextStyle: {
                color: '#666',
                fontSize: 16,
                padding: [0, 0, 10, 0]
              },
              axisLine: {
                lineStyle: {
                  color: '#666',
                }
              },
              type: 'value'
            },
            series: [
              {
                name: '注册量',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    //color: '#bbe6ec',
                    color: '#f08181',
                  }
                },
              }
            ]
          };
          this.getListData()
          console.log("修改前option", this.option)
          if (this.value[1] == 0) {
            console.log("以年为周期")
            //console.log("修改前option",this.option)
            this.option.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            this.option.series[0].data = this.yearData.list
            console.log("option", this.option)
            this.chartLine.setOption(this.option);
          } else if (this.value[1] == 1) {
            console.log("以周为周期")
            this.option.xAxis.data = [this.selectedDay, this.getNewData(this.selectedDay,1), this.getNewData(this.selectedDay,2), this.getNewData(this.selectedDay,3), this.getNewData(this.selectedDay,4), this.getNewData(this.selectedDay,5), this.getNewData(this.selectedDay,6)]
            this.option.xAxis.nameTextStyle.fontSize=12
            this.option.series[0].data = this.dayData.list
            console.log("option", this.option)
            this.chartLine.setOption(this.option);
          }

        },
        getListData() {
          if (this.value[1] != 1) {
            console.log("查询年数据")
            this.$axios.post('http://localhost:8080/online_answer/admin/viewRegnumByYear',
              qs.stringify({
                year: this.selectedYear,
              })
            ).then((response) => {
              this.yearData = response.data.data
              console.log("YEAR:", this.selectedYear)
              this.option.series[0].data = this.yearData.list
              console.log("修改后option", this.option)
              this.chartLine.setOption(this.option);
            }).catch((error) => {
              console.log(error);
            });
          } else if(this.value[1] == 1) {
            console.log("查询周数据")
            this.$axios.post('http://localhost:8080/online_answer/admin/viewRegnumByDate',
              qs.stringify({
                date: this.selectedDay,
              })
            ).then((response) => {
              this.dayData = response.data.data
              console.log("YEAR:", this.selectedDay)
              this.option.series[0].data = this.dayData.list
              console.log("后一天：",this.getNewData(this.selectedDay,1))
              console.log("修改后option", this.option)
              this.chartLine.setOption(this.option);
            }).catch((error) => {
              console.log(error);
            });
          }

        },
        selectChange(value) {
          console.log("value0", value[0])
          console.log("value1", value[1])
          this.getChartData()
        },
        getNewData(dateTemp, days) {
          var dateTemp = dateTemp.split("-");
          var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
          var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
          var rDate = new Date(millSeconds);
          var year = rDate.getFullYear();
          var month = rDate.getMonth() + 1;
          if (month < 10) month = "0" + month;
          var date = rDate.getDate();
          if (date < 10) date = "0" + date;
          return (year + "-" + month + "-" + date);
        }
      }
    }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
