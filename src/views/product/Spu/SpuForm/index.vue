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
        <el-select :placeholder="`还有${unSelectedAttrValue.length}未选择`"
                   clearable
                   filterable
                   v-model="attrIdAndName">
          <!-- el-option进行传入数据 到el-select 的v-model里面-->
          <!-- :label表示展示的内容 -->
          <!-- :value表示收集的数据 -->
          <el-option :label="unselect.name"
                     :value="`${unselect.id}:${unselect.name}`"
                     v-for="(unselect,index) in unSelectedAttrValue"
                     :key="unselect.id">
          </el-option>
        </el-select>
        <el-button type="primary"
                   size="default"
                   icon="el-icon-plus"
                   :disabled="!attrIdAndName"
                   @click="addSaleAttr">添加销售属性</el-button>
      </el-form-item>
      <el-form-item>
        <el-table stripe
                  border
                  style="width: 100%"
                  :data="spu.spuSaleAttrList">
          <el-table-column type="index"
                           label="序号"
                           min-width="10%"
                           align="center">
          </el-table-column>
          <el-table-column :prop="`saleAttrName||''`"
                           label="属性名"
                           min-width="20%">
          </el-table-column>
          <el-table-column :prop="`spuSaleAttrValueList||''`"
                           label="属性名称列表"
                           min-width="60%">
            <template slot-scope="{row,$index}">
              <el-tag :key="tag.id"
                      v-for="(tag,index) in row.spuSaleAttrValueList"
                      closable
                      :disable-transitions="false"
                      @close="row.spuSaleAttrValueList.splice(index,1)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- @keyup.enter.native="
                      handleInputConfirm"
                      @blur="handleInputConfirm"
                      -->
              <el-input class="input-new-tag"
                        v-if="row.inputVisible"
                        v-model="row.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @blur="handleInputConfirm(row)">
              </el-input>
              <el-button v-else
                         class="button-new-tag"
                         size="small"
                         @click="showInput(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           min-width="10%">
            <template slot-scope="{row,$index}">
              <!-- @click="" -->
              <el-button type="danger"
                         size="mini"
                         icon="el-icon-delete"
                         @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   size="default"
                   @click="addOrUpdateSpu">保存</el-button>
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
      baseSaleAttrList: [],
      //tags
      // dynamicTags: ['标签一', '标签二', '标签三'],
      // inputVisible: false,
      inputValue: '',
      // 未选择的Id
      attrIdAndName: ''
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
    addSaleAttr () {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndName = ''
    },
    //tags
    handleClose (tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      console.log(tag);
    },

    // showInput () {
    //   this.inputVisible = true;
    //   this.$nextTick(_ => {
    //     this.$refs.saveTagInput.$refs.input.focus();
    //   });
    // },
    showInput (row) {
      this.$set(row, 'inputValue', '')
      this.$set(row, 'inputVisible', true)
      // row.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm (row) {
      console.log(row);
      let { baseSaleAttrId, inputValue } = row
      // 输入不能为空
      if (inputValue.trim() == '') {
        this.$message.warning('输入不能为空')
        row.inputVisible = false;
        return
      }
      // 属性值不能重复
      let result = row.spuSaleAttrValueList.some(item => {
        return item.saleAttrValueName == inputValue //只要有一个满足就返回真，否则则假
      })
      if (result) {
        this.$message.warning('请勿输入重复的属性')
        row.inputVisible = false;
        return
      }

      row.spuSaleAttrValueList.push({ baseSaleAttrId, saleAttrValueName: inputValue })
      row.inputVisible = false;

      // let inputValue = this.inputValue;
      // if (inputValue) {
      //   this.dynamicTags.push(inputValue);
      // }
      // this.inputVisible = false;
      // this.inputValue = '';
    },
    async addOrUpdateSpu () {
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url
        }
      })
    }
  },
  computed: {
    //尚未选择的销售属性
    unSelectedAttrValue () {
      let res = this.baseSaleAttrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
      return res
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>