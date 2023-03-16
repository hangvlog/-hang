<template>
  <div>
    <el-form :inline="true"
             :model="categoryForm"
             class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="categoryForm.category1Id"
                   placeholder="请选择"
                   @change="handler1"
                   :disabled="show">
          <el-option :label="item.name"
                     :value="item.id"
                     v-for="(item,index) in category1List"
                     :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryForm.category2Id"
                   placeholder="请选择"
                   @change="handler2"
                   :disabled="show">
          <el-option :label="item.name"
                     :value="item.id"
                     v-for="(item,index) in category2List"
                     :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryForm.category3Id"
                   placeholder="请选择"
                   @change="handler3"
                   :disabled="show">
          <el-option :label="item.name"
                     :value="item.id"
                     v-for="(item,index) in category3List"
                     :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data () {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      categoryForm: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
      }
    }
  },
  methods: {
    async getCategory1List () {
      let result = await this.$API.attr.reqCategory1List()
      if (result.code == 200) {
        this.category1List = result.data
      } else {
        throw (new Error('error'))
      }
    },
    async handler1 () {
      const { category1Id } = this.categoryForm
      this.categoryForm.category2Id = ''
      this.category2List = []
      this.categoryForm.category3Id = ''
      this.category3List = []
      let result = await this.$API.attr.reqCategory2List(category1Id)
      if (result.code == 200) {
        this.category2List = result.data
      } else {
        throw (new Error('error'))
      }
    },
    async handler2 () {
      const { category2Id } = this.categoryForm
      this.categoryForm.category3Id = ''
      this.category3List = []
      let result = await this.$API.attr.reqCategory3List(category2Id)
      if (result.code == 200) {
        this.category3List = result.data
      } else {
        throw (new Error('error'))
      }
    },
    handler3 () {
      this.$emit('sendCategoryForm', this.categoryForm)
    }
  },
  mounted () {
    this.getCategory1List()
  }
}
</script>

<style lang="less" scoped>
</style>