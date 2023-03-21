<template>
  <div>
    <el-table border
              stripe
              :data="records">
      <el-table-column label="序号"
                       type="index">
      </el-table-column>
      <el-table-column label="名称"
                       prop="skuName">
      </el-table-column>
      <el-table-column label="描述"
                       prop="skuDesc">
      </el-table-column>
      <el-table-column label="默认图片">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg"
               style="width: 100%;">
        </template>
      </el-table-column>
      <el-table-column label="重量(KG)"
                       prop="weight"
                       width="50">
      </el-table-column>
      <el-table-column label="价格(元)"
                       prop="price"
                       width="80">
      </el-table-column>
      <el-table-column label="操作"
                       width="280">
        <template slot-scope="{row,$index}">
          <el-button type="info"
                     size="mini"
                     icon="el-icon-sort-down"
                     v-if="row.isSale == 1"
                     @click="cancelSale(row)"
                     title="点击下架"></el-button>
          <el-button type="success"
                     size="mini"
                     icon="el-icon-sort-up"
                     title="点击上架"
                     @click="onSale(row)"
                     v-else></el-button>
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-edit"
                     title="点击编辑"
                     @click="$message('开发中')"></el-button>
          <el-button type="info"
                     size="mini"
                     title="点击查看详情"
                     @click="getSkuInfo(row)"
                     icon="el-icon-info"></el-button>
          <el-button type="danger"
                     size="mini"
                     title="点击删除"
                     @click=""
                     icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- @size-change="handleSizeChange"
    @current-change="handleCurrentChange" -->
    <el-pagination :current-page="currentPage"
                   :page-sizes="[3, 5, 10]"
                   :page-size="limit"
                   layout="prev, pager, next, jumper,->,sizes,total"
                   :total="total"
                   align="center"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange">
    </el-pagination>

    <!-- 抽屉部分 -->
    <el-drawer :visible.sync="isShowDrawer"
               size="50%"
               :show-close="false">
      <el-row>
        <el-col :span="5">
          名称
        </el-col>
        <el-col :span="16">
          {{ skuInfo.skuName }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          描述
        </el-col>
        <el-col :span="16">
          {{ skuInfo.skuDesc }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          价格
        </el-col>
        <el-col :span="16">
          {{ skuInfo.price }}元
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          平台属性
        </el-col>
        <el-col :span="16">
          <template slot-scope="{row,$index}">
            <el-tag type="success"
                    v-for="(item, index) in skuInfo.skuAttrValueList"
                    :key="index">{{item.valueName}}
            </el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          图片
        </el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList"
                              :key="item.id">
              <img :src="item.imgUrl"
                   alt="">
            </el-carousel-item>
          </el-carousel>
          <!-- <img :src="item.imgUrl"
               :alt="item.imgName"
               v-for="(item, index) in skuInfo.skuImageList"
               :key="index"
               style="width: 100%;"> -->
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name: 'sku',
  data () {
    return {
      currentPage: 1,
      limit: 5,
      total: 0,
      records: [],
      skuInfo: {},
      isShowDrawer: false
    }
  },
  methods: {
    async getData () {
      let { currentPage, limit } = this
      let result = await this.$API.sku.reqSkuList(currentPage, limit)
      if (result.code == 200) {
        // console.log(result);
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.getData()
    },
    handleSizeChange (pageSize) {
      this.limit = pageSize
      this.getData()
    },
    async onSale (row) {
      let result = await this.$API.sku.reqSale(row.id)
      if (result.code == 200) {
        row.isSale = 1
        this.$message.success('上架成功')
      }
    },
    async cancelSale (row) {
      let result = await this.$API.sku.reqCancel(row.id)
      if (result.code == 200) {
        row.isSale = 0
        this.$message.success('下架成功')
      }
    },
    async getSkuInfo (row) {
      let result = await this.$API.sku.reqSkuById(row.id)
      // console.log(result);
      if (result.code == 200) {
        this.skuInfo = result.data
      }
      this.isShowDrawer = true
    }
  },
  mounted () {
    this.getData()
  }
};
</script>

<style>
.el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: aquamarine;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>