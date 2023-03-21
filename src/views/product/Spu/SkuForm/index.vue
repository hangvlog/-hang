<template>
  <div>
    <el-form ref="form"
             label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input type="number"
                  v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述(千克)">
        <el-input type="textarea"
                  rows="2"
                  v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form"
                 label-width="80px"
                 :inline="true"
                 size="normal">
          <el-form-item :label="attr.attrName"
                        v-for="(attr, index) in attrInfoList"
                        :key="attr.id">
            <el-select placeholder="请选择"
                       clearable
                       filterable
                       v-model="attr.attrIdAndValue">
              <el-option :label="attrValue.valueName"
                         :value="`${attr.id}:${attrValue.id}`"
                         v-for="(attrValue, index) in attr.attrValueList"
                         :key="attrValue.id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择"
                       clearable
                       filterable
                       value="">
              <el-option value="value">
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>

      </el-form-item>
      <el-form-item label="销售属性"
                    size="normal">
        <el-form ref="form"
                 label-width="80px"
                 :inline="true"
                 size="normal">
          <el-form-item :label="spuSaleAttr.saleAttrName"
                        size="normal"
                        v-for="(spuSaleAttr, index) in spuSaleAttrList"
                        :key="spuSaleAttr.id">
            <el-select placeholder="请选择"
                       clearable
                       filterable
                       v-model="spuSaleAttr.attrIdAndValueId">
              <el-option :value="`${spuSaleAttr.id}:${saleAttr.id}`"
                         :label="saleAttr.saleAttrValueName"
                         v-for="(saleAttr, index) in spuSaleAttr.spuSaleAttrValueList"
                         :key="saleAttr.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表"
                    size="normal">
        <el-table border
                  :data="spuImageList"
                  stripe
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl"
                   alt=""
                   style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="名称"
                           prop="imgName">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-button type="primary"
                         size="default"
                         @click="changeDefault(row,$index)"
                         v-show="row.isDefault == 0">设置默认</el-button>
              <el-button type="primary"
                         size="default"
                         @click=""
                         v-show="row.isDefault != 0">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label=""
                    size="normal">
        <el-button type="primary"
                   size="default"
                   @click="save">保存</el-button>
        <el-button size="default"
                   @click="cancel">取消</el-button>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { isTSEnumMember } from '@babel/types'

export default {
  name: 'SkuForm',
  data () {
    return {
      spuImageList: [],
      attrInfoList: [],
      spuSaleAttrList: [],
      spu: {},
      imageList: [],
      skuInfo: {
        //父组件传递的
        "category3Id": 0,
        "spuId": 0,
        "tmId": 0,
        // "createTime": "2023-03-20T07:42:39.218Z",
        // "id": 0,
        // "isSale": 0,
        // v-model双向绑定的
        "price": 0,
        "weight": "",
        "skuName": "",
        "skuDesc": "",
        // 从服务器拿到的
        "skuDefaultImg": "",
        "skuAttrValueList": [
          // {

          //   "id": 0,
          //   "skuId": 0,
          //   "valueId": 0,
          // }
        ],
        "skuImageList": [
          // {
          //   "id": 0,
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "isDefault": "string",
          //   "skuId": 0,
          //   "spuImgId": 0
          // }
        ],
        "skuSaleAttrValueList": [
          // {
          //   "id": 0,
          //   "saleAttrId": 0,
          //   "saleAttrName": "string",
          //   "saleAttrValueId": 0,
          //   "saleAttrValueName": "string",
          //   "skuId": 0,
          //   "spuId": 0
          // }
        ],


      }
    }
  },
  methods: {
    async getSpuImageList (spuId) {
      let result = await this.$API.spu.reqSpuImageList(spuId)
      if (result.code == 200) {
        let imageList = result.data
        imageList.forEach(item => {
          item.isDefault = 0
        })
        this.spuImageList = imageList
      }
    },
    async getAttrInfoList (category1Id, category2Id, category3Id) {
      let result = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, category3Id)
      // console.log(result)
      if (result.code == 200) {
        this.attrInfoList = result.data
      }
    },
    async getSpuSaleAttrList (spuId) {
      let result = await this.$API.spu.reqSpuSaleAttrList(spuId)
      // console.log(result);
      if (result.code == 200) {
        this.spuSaleAttrList = result.data
      }
    },
    getData (category1Id, category2Id, spu) {
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.tmId = spu.tmId
      this.skuInfo.spuId = spu.id

      this.spu = spu

      console.log(spu, category1Id, category2Id)
      console.log('getData');
      this.getSpuImageList(spu.id)
      this.getAttrInfoList(category1Id, category2Id, spu.category3Id)
      this.getSpuSaleAttrList(spu.id)

    },
    cancel () {
      this.$emit('changeScene', 0)
      // 清除数据
      Object.assign(this._data, this.$options.data())
    },
    handleSelectionChange (selection) {
      // console.log(selection);
      // selection.forEach(item => {
      //   item.isDefault = "false"
      // })
      this.imageList = selection

    },
    changeDefault (row, index) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      // this.spuImageList[index].isDefault = 1
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    async save () {
      // 平台属性整理
      // let arr = []
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this
      // attrInfoList.forEach(item => {
      //   // let {}
      //   if (item.attrIdAndValue) {
      //     let [attrId, valueId] = item.attrIdAndValue.split(':')
      //     let obj = { attrId, valueId }
      //     arr.push(obj)
      //   }
      // })
      // skuInfo.skuAttrValueList = arr
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValue) {
          let [attrId, valueId] = item.attrIdAndValue.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          let [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,

        }
      })

      let result = await this.$API.spu.reqAddSku(this.skuInfo)
      // console.log(result);
      if (result.code == 200) {
        this.$emit('changeScene', 0)
        this.$message.success('添加sku成功')
      } else {
        this.$message.success('添加失败')
      }
      // console.log(this.imageList);
      // skuInfo.skuAttrValueList = result
      // console.log(result);
    }

    // let result = await this.$API.spu.reqAddSku(this.skuInfo)
    // console.log(result);
    // test (row) {
    //   console.log(row)
    // }
  }

}
</script>

<style>
</style>