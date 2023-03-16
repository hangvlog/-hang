<template>
  <div>
    <el-form label-width="80px"
             model="spu">
      <el-form-item label="活动名称">
        <el-input placeholder="Spu名称"
                  v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌"
                   v-model="spu.tmId">
          <el-option :label="item.tmName"
                     value="shanghai"
                     v-for="(item,index) in tradeMarkList"
                     :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input type="textarea"
                  rows="3"
                  v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%"
               :src="item"
               alt=""
               v-for="(item,index) in spuImageList"
               :key="item.id">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="还有3未选择"
                   clearable
                   filterable>
          <el-option>
          </el-option>
        </el-select>
        <el-button type="primary"
                   size="default"
                   @click=""
                   icon="el-icon-plus">添加销售属性</el-button>
      </el-form-item>
      <el-form-item>
        <el-table stripe
                  border
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="属性名"
                           width="180">
          </el-table-column>
          <el-table-column prop="address"
                           label="属性名称列表">
          </el-table-column>
          <el-table-column prop="address"
                           label="操作">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   size="default"
                   @click="">保存</el-button>
        <el-button size="default"
                   @click="$emit('changeScene',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!-- 接口是后端写的，一般是产品经理或者你们的小组组长会先写出需求文档，后端再按照需求文档写接口，
然后比较成熟的后端会写接口文档的，需要哪些参数，参数格式，返回值的各个属性以及各个属性的含义都会写好的 -->
<script>
export default {
  name: 'SpuForm',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spuName: '',
      // id: ''
      spu: {
        //三级分类的id
        category3Id: 0,
        //描述
        description: "",
        //spu名称
        spuName: "",
        //平台的id
        tmId: "",
        //收集SPU图片的信息
        spuImageList: [],
        //平台属性与属性值收集
        spuSaleAttrList: [],
      },
      tradeMarkList: [],
      spuImageList: [],
      baseSaleAttrList: []
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    initSpuData (spu) {
      console.log(spu);
      this.spuName = spu.spuName
      this.spuImageList = spu.spuImageList
      this.getSpu(spu.id)
      this.getTradeMarkList()
      this.getSpuImageList()
      this.getBaseSaleAttrList(spu.id)

    },
    async getSpu (spuId) {
      let result = await this.$API.spu.reqSpu(spuId)
      if (result.code == 200) {
        this.spu = result.data
      }
    },
    async getTradeMarkList () {
      let result = await this.$API.spu.reqTradeMarkList()
      if (result.code == 200) {
        this.tradeMarkList = result.data
      }
    },
    async getSpuImageList () {
      try {
        let result = await this.$API.spu.reqSpuImageList()
        if (result.code == 200) {
          this.spuImageList = result.data
        }
      } catch (e) {
        this.$message.error('接口现在不能用啦')
      }

    },
    async getBaseSaleAttrList (spuId) {
      let result = await this.$API.spu.reqBaseSaleAttrList(spuId)
      if (result.code == 200) {
        this.baseSaleAttrList = result.data
      }
    },
  }
}
</script>

<style lang="less" scoped>
</style>