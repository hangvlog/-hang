<template>
  <div class="charts"
       ref="charts">
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  mounted () {
    let chart = echarts.init(this.$refs.charts)
    chart.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        //隐藏y轴
        show: false,
      },
      series: [
        {
          smooth: true,
          name: '销量',
          type: 'line',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false

            },
          },
        }
      ],
      tooltip: {}
    })
  },
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>