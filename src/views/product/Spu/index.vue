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
                           @click=""
                           icon="el-icon-plus"
                           title="添加spu"></hint-button>
              <hint-button type="warning"
                           size="mini"
                           @click="addOrUpdateSpu(row)"
                           icon="el-icon-edit"
                           title="修改spu"></hint-button>
              <hint-button type="info"
                           size="mini"
                           @click=""
                           icon="el-icon-info"
                           title="查看当前spu全部sku列表"></hint-button>
              <hint-button type="danger"
                           size="mini"
                           @click=""
                           icon="el-icon-delete"
                           title="删除spu"></hint-button>
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
        <SkuForm v-show="scene==2"></SkuForm>
      </div>
    </el-card>

  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'SPU',
  data () {
    return {
      currentPage: 1,
      limit: 3,
      total: 0,
      records: [],
      show: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      scene: 1
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