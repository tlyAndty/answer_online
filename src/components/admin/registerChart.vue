<template>
  <div class="top">
    <span style="font-size: 30px">图表test列表</span>
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
    </div>
    <div id="chartLineBox" style="width: 700px;height:300px;margin: 0 auto;margin-top: 50px">
    </div>
  </div>
</template>

<script>
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
        }
      },
      mounted(){
        this.getChartData()
        this.chartLine = echarts.init(document.getElementById('chartLineBox'));
        this.chartLine.setOption(this.option);
        window.onresize = function () {
          this.chartLine.resize()
        }
        console.log("画一次图")
      },
      methods:{
        getChartData(){
          this.option = {
            tooltip: {              //设置tip提示
              trigger: 'axis'
            },
            legend: {               //设置区分（哪条线属于什么）
              data:['注册量']
            },
            color: ['#8AE09F'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
              type: 'category',
              boundaryGap: false,     //坐标轴两边不留白
              data: ['2019-1-1', '2019-2-1', '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1',],
              name: '日期',           //X轴 name
              nameTextStyle: {        //坐标轴名称的文字样式
                color: '#FA6F53',
                fontSize: 16,
                padding: [0, 0, 0, 20]
              },
              axisLine: {             //坐标轴轴线相关设置。
                lineStyle: {
                  color: '#FA6F53',
                }
              }
            },
            yAxis: {
              name: '人数',
              nameTextStyle: {
                color: '#FA6F53',
                fontSize: 16,
                padding: [0, 0, 10, 0]
              },
              axisLine: {
                lineStyle: {
                  color: '#FA6F53',
                }
              },
              type: 'value'
            },
            series: [
              {
                name: '注册量',
                data:  [20, 32, 1, 34, 90, 30, 20],
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    color: '#8AE09F',
                  }
                },
              }
            ]
          };
          console.log("修改前option",this.option)
          if(this.value[1]==0){
            console.log("以年为周期")
            //console.log("修改前option",this.option)
            this.option.xAxis.data=['2020','2021','2022']
            this.option.series[0].data=[10,15,20]
            /*this.option = {
              tooltip: {              //设置tip提示
                trigger: 'axis'
              },
              legend: {               //设置区分（哪条线属于什么）
                data:['注册量']
              },
              color: ['#8AE09F'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
              xAxis: {                //设置x轴
                type: 'category',
                boundaryGap: false,     //坐标轴两边不留白
                data: ['2020','2021','2022'],
                name: '日期',           //X轴 name
                nameTextStyle: {        //坐标轴名称的文字样式
                  color: '#FA6F53',
                  fontSize: 16,
                  padding: [0, 0, 0, 20]
                },
                axisLine: {             //坐标轴轴线相关设置。
                  lineStyle: {
                    color: '#FA6F53',
                  }
                }
              },
              yAxis: {
                name: '人数',
                nameTextStyle: {
                  color: '#FA6F53',
                  fontSize: 16,
                  padding: [0, 0, 10, 0]
                },
                axisLine: {
                  lineStyle: {
                    color: '#FA6F53',
                  }
                },
                type: 'value'
              },
              series: [
                {
                  name: '注册量',
                  data:  [10,15,20],
                  type: 'line',               // 类型为折线图
                  lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                      color: '#8AE09F',
                    }
                  },
                }
              ]
            };*/
            console.log("option",this.option)
            this.chartLine.setOption(this.option);
          }
          else if(this.value[1]==1){
            console.log("以周为周期")
            this.option.xAxis.data=['2020-6-11','2020-6-12','2020-6-13','2020-6-14','2020-6-14','2020-6-16','2020-6-17']
            this.option.series[0].data=[10,15,20,53,32,32,35]
            console.log("option",this.option)
            this.chartLine.setOption(this.option);
          }
        },
        selectChange(value) {
          console.log("value0",value[0])
          console.log("value1",value[1])
          this.getChartData()
        },
      }
    }
</script>

<style scoped>
  .top{
    text-align:center;
  }
</style>
