<template>
  <div>

    <el-card style="margin: 20px 0px;">
      <CategorySelect @sendCategoryForm="getCategoryIds"
                      :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示商品 -->
      <div v-show="isShowTable">
        <el-button type="primary"
                   size="default"
                   @click="addAttr"
                   icon="el-icon-plus"
                   :disabled="!category3Id">添加属性</el-button>
        <el-table :data="attrList"
                  stripe
                  border
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           width="80"
                           align="center">
          </el-table-column>
          <el-table-column prop="attrName"
                           label="属性名称"
                           width="150">

          </el-table-column>
          <el-table-column prop="address"
                           label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag type="success"
                      style="margin: 0 10px;"
                      v-for="(item,index) in row.attrValueList"
                      :key="item.id">{{item.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address"
                           label="操作"
                           width="150">
            <template slot-scope="{ row, $index }">
              <el-button type="warning"
                         icon="el-icon-edit"
                         size="mini"
                         @click="updateTradeMark(row)"></el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="deleteTradeMark(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改某个商品 -->
      <div v-show="!isShowTable">
        <el-form label-width="80px"
                 :inline="false"
                 size="normal">
          <el-form-item label="属性名称">
            <el-input v-model="attrInfo.attrName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="addAttrValue"
                       icon="el-icon-plus"
                       :disabled="!attrInfo.attrName">添加属性值</el-button>
            <el-button @click="isShowTable=true">取消</el-button>
          </el-form-item>
          <!-- 表格部分 -->
          <el-table :data="attrInfo.attrValueList"
                    stripe
                    style="width: 100%">
            <el-table-column prop="date"
                             label="序号"
                             min-width="5%"
                             type="index">
            </el-table-column>
            <el-table-column prop="name"
                             label="属性值列表"
                             min-width="60%">
              <template slot-scope="{row,$index}">
                <!-- row -->
                <el-input v-model.trim="row.valueName"
                          placeholder="请输入属性值名称"
                          size="mini"
                          clearable
                          @change=""
                          v-if="row.flag"
                          @blur="toLook(row)"
                          @keyup.native.enter="flag=row.false"
                          :ref="$index"></el-input>
                <span v-else
                      @click="toEdit(row,$index)"
                      style="display: block;">{{row.valueName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address"
                             label="操作"
                             min-width="20%">
              <template slot-scope="{row,$index}">
                <el-popconfirm confirm-button-text='是的'
                               cancel-button-text='不用了'
                               icon="el-icon-info"
                               icon-color="red"
                               :title="`确定删除${row.valueName}吗？`"
                               @onConfirm="deleteValueName($index)">
                  <el-button type="danger"
                             size="mini"
                             icon="el-icon-delete"
                             @click=""
                             slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item>
            <el-button type="primary"
                       :disabled="attrInfo.attrValueList.length<1"
                       @click="addOrUpdateAttr">保存</el-button>
            <el-button @click="isShowTable=true">取消</el-button>
          </el-form-item>

        </el-form>

      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  data () {
    return {
      attrList: [],
      isShowTable: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrInfo: {
        attrName: '666',
        attrValueList: [],
        id: undefined,
        categoryId: undefined,
        categoryLevel: undefined
      }
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
        this.attrList = result.data
      } else {
        throw (new Error('error'))
      }
    },
    addAttrValue () {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true,
      })
      let index = this.attrInfo.attrValueList.length - 1
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    addAttr () {
      this.attrInfo.attrValueList = []
      this.isShowTable = false
    },
    updateTradeMark (row) {
      this.isShowTable = false
      this.attrInfo.attrName = row.attrName
      this.attrInfo.attrValueList = cloneDeep(row.attrValueList)
      this.attrInfo.categoryId = row.categoryId
      this.attrInfo.categoryLevel = row.categoryLevel
      this.attrInfo.id = row.id
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
    },
    toLook (row) {
      if (row.valueName.trim() == '') {
        this.$message.warning('请勿输入空')
        this.attrInfo.attrValueList.pop()
        return
      }
      let isRepeat = this.attrInfo.attrValueList.some(item => {
        if (row != item) {
          return row.valueName == item.valueName
        }
      })
      if (isRepeat) {
        this.$message.warning('请勿输入重复的属性')
        this.attrInfo.attrValueList.pop()
        return
      }
      row.flag = false
    },
    toEdit (row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    deleteValueName (index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    async addOrUpdateAttr () {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName != '') {
          delete (item.flag)
          return true
        }
      })
      try {
        let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        if (result.code == 200) {
          this.isShowTable = true
          this.$message.success("修改成功")
          this.getCategoryIds({ category1Id: this.category1Id, category2Id: this.category2Id, category3Id: this.category3Id })
        }
      } catch (error) {
        this.$message.warning("这个数据不能修改")
      }
    }
  }

}
</script>

<style lang="less" scoped>
</style>