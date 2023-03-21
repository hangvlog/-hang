<template>
  <div>
    <!-- spu -->
    <el-card shadow="always"
             :body-style="{ padding: '20px' }">
      <CategorySelect @sendCategoryForm="getCategoryIds"
                      :show="!show"></CategorySelect>
    </el-card>

    <el-card shadow="always"
             :body-style="{ padding: '20px' }">
      <div v-show="scene==0">
        <el-button type="primary"
                   size="default"
                   @click="addOrUpdateSpu"
                   icon="el-icon-plus"
                   :disabled="!category3Id">
          添加SPU
        </el-button>
        <el-table stripe
                  style="width: 100%"
                  :data="records">
          <el-table-column type="index"
                           label="序号"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="spuName"
                           label="spu名称"
                           width="180">

          </el-table-column>
          <el-table-column prop="description"
                           label="spu描述">
          </el-table-column>
          <el-table-column prop="address"
                           label="操作">
            <template slot-scope="{row,$index}">
              <hint-button type="success"
                           size="mini"
                           icon="el-icon-plus"
                           @click="addSku(row)"
                           title="添加sku"></hint-button>
              <hint-button type="warning"
                           size="mini"
                           @click="addOrUpdateSpu(row)"
                           icon="el-icon-edit"
                           title="修改spu"></hint-button>
              <hint-button type="info"
                           size="mini"
                           icon="el-icon-info"
                           title="查看当前spu全部sku列表"
                           @click="handle(row)"></hint-button>
              <!-- <hint-button type="danger"
                           size="mini"
                           @click="deleteSpu(row,$index)"
                           icon="el-icon-delete"
                           title="删除spu"
                           slot="reference"></hint-button> -->
              <el-popconfirm confirm-button-text='好的'
                             cancel-button-text='不用了'
                             icon="el-icon-info"
                             icon-color="red"
                             title="这是一段内容确定删除吗？"
                             @onConfirm="deleteSpu(row,$index)">
                <!-- @click="deleteSpu(row,$index)" -->
                <hint-button type="danger"
                             size="mini"
                             icon="el-icon-delete"
                             title="删除spu"
                             slot="reference"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @current-change="getSpuList"
                         @size-change="handlerLimitChange"
                         :current-page="currentPage"
                         :page-sizes="[3, 5, 7, 20]"
                         :page-size="limit"
                         layout="prev, pager, next, jumper,->,sizes,total"
                         :total="total"
                         style="text-align: center;">
          </el-pagination>
        </div>
      </div>
      <div>
        <SpuForm v-show="scene==1"
                 @changeScene="changeScene"
                 ref="spu"></SpuForm>
        <SkuForm v-show="scene==2"
                 ref="sku"
                 @changeScene="changeScene"></SkuForm>
      </div>
    </el-card>
    <!-- sku对话框 -->
    <el-dialog :title="`${spu.spuName}的sku列表`"
               :visible.sync="skuDialogTableVisible"
               :before-close="close">
      <el-table :data="skuList"
                border
                v-loading="loading">
        <el-table-column label="名称"
                         width="150"
                         prop="skuName"></el-table-column>
        <el-table-column property="name"
                         label="价格"
                         width="200"
                         prop="price"></el-table-column>
        <el-table-column label="重量"
                         prop="weight"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg"
                 style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'SPU',
  data () {
    return {
      skuDialogTableVisible: false,
      currentPage: 1,
      limit: 3,
      total: 0,
      records: [],
      show: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      scene: 0,
      spu: {},
      skuList: [],
      loading: true
    }
  },
  methods: {
    async getCategoryIds (categoryForm) {
      let { category1Id, category2Id, category3Id } = categoryForm
      this.category1Id = category1Id
      this.category2Id = category2Id
      this.category3Id = category3Id

      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code == 200) {
        // this.attrList = result.data
        this.getSpuList()
      } else {
        throw (new Error('error'))
      }
    },
    async getSpuList (page = 1) {
      this.currentPage = page
      // this.limit = limit
      let result = await this.$API.spu.reqSpuList(this.currentPage, this.limit, this.category3Id)
      if (result.code == 200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    handlerLimitChange (limit) {
      this.limit = limit
      this.getSpuList()
    },
    addOrUpdateSpu (row) {
      // console.log(row);
      this.scene = 1
      this.$refs.spu.initSpuData(row)

    },
    changeScene (scene) {
      this.scene = scene
      // console.log(this.refs);
      // console.log(scene);
    },
    async deleteSpu (row, index) {
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code == 200) {
        this.$message.success('删除成功')
        // this.records.splice(index, 1)
        // if (currentPage)
        this.getSpuList(this.records.length >= 1 ? this.currentPage : this.currentPage - 1)
      } else {
        this.$message.error('删除失败')
      }
      // console.log(row);
      // console.log(this.records);
    },
    addSku (row) {
      this.scene = 2
      // console.log(row);
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    async handle (spu) {
      this.skuDialogTableVisible = true
      this.spu.spuName = spu.spuName
      let result = await this.$API.spu.reqSkuList(spu.id)
      // console.log(result);
      if (result.code == 200) {
        this.skuList = result.data
        this.loading = false
      } else {
        this.$message.error('sku数据获取失败')
      }
    },
    close (done) {
      this.loading = true
      this.skuList = []
      done()
    }
  },
  components: {
    SpuForm,
    SkuForm
  }

}
</script>

<style>
</style>