<template>
  <div>
    <!-- card组件
    <Detail></Detail> -->
    <el-row :gutter="20">
      <el-col :span="6"
              :offset="0">
        <el-card shadow="always"
                 :body-style="{ padding: '20px' }">
          <Detail title="总销售额"
                  count="12306">
            <!-- <template slot="charts"
                      style="display: flex;font-size: 12px;margin: 10px 0;">
              <span>周同比&nbsp;&nbsp;56.67%</span>
              <svg t="1678328089646"
                   class="icon"
                   viewBox="0 0 1024 1024"
                   version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="3611"
                   width="16"
                   height="16">
                <path d="M511.997952 268.025732 146.975708 755.974268l730.048584 0L511.997952 268.025732"
                      p-id="3612"
                      fill="#1afa29"></path>
              </svg>
              <span>日同比&nbsp;&nbsp;56.67%</span>
              <svg t="1678328156894"
                   class="icon"
                   viewBox="0 0 1024 1024"
                   version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="4762"
                   width="16"
                   height="16">
                <path d="M213.333333 341.333333h597.333334l-298.666667 384z"
                      p-id="4763"
                      fill="#d81e06"></path>
              </svg>
            </template> -->
            <template slot="charts">
              <!-- charts -->
              <LineChart></LineChart>

            </template>
            <template slot="footer">
              <span>日销售额</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6"
              :offset="0">2</el-col>
      <el-col :span="6"
              :offset="0">3</el-col>
      <el-col :span="6"
              :offset="0">4</el-col>
    </el-row>

  </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './LineChart'
export default {
  name: 'CardIndex',
  components: {
    Detail,
    LineChart
  }
}
</script>

<style lang="less" scoped>
</style>