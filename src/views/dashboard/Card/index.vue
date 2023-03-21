<template>
  <div>
    <!-- card组件 -->
    <!-- el的栅格布局共划分了24栏 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card shadow="always">
            <Detail title="总销售额"
                    count="126560">
              <template slot="charts"
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
              </template>
              <template slot="footer">
                日销售额￥12432
              </template>
            </Detail>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card shadow="always">
            <Detail title="访问量"
                    count="88460">
              <template slot="footer">
                日访问量1243
              </template>
            </Detail>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card shadow="always">
            <Detail title="支付笔数"
                    count="88460">
              <template slot="footer">
                转换率64%
              </template>
            </Detail>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card shadow="always">
            <Detail title="运营活动效果"
                    count="78">
              <template slot="footer"
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
              </template>
            </Detail>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
// import LineChart from './LineChart'
export default {
  name: 'CardIndex',
  components: {
    Detail,
    // LineChart
  }
}
</script>

<style lang="sass">
.el-row
  margin-bottom: 20px
  &:last-child
    margin-bottom: 0

.el-col
  border-radius: 4px

.bg-purple-dark
  background: #99a9bf

.bg-purple
  background: #d3dce6

  &-light
    background: #e5e9f2

.grid-content
  border-radius: 4px
  min-height: 36px

.row-bg
  padding: 10px 0
  background-color: #f9fafc
</style>