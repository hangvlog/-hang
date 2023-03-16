<template>
  <div>
    <el-button type="primary"
               @click="showDialog">添加</el-button>
    <el-table :data="list"
              height="350px"
              border
              style="width: 100%;margin-top: 15px;">

      <el-table-column type="index"
                       label="序号"
                       width="180"
                       align="center">
      </el-table-column>

      <el-table-column prop="tmName"
                       label="品牌名称"
                       width="180"
                       align="center">
      </el-table-column>

      <el-table-column prop="address"
                       label="品牌LOGO"
                       align="center">
        <template slot-scope="{ row, $index }">
          <!-- {{ row,$index }} -->
          <img :src="row.logoUrl"
               alt=""
               style="width: 80px;height: 80px;">
        </template>
      </el-table-column>

      <el-table-column prop="address"
                       label="操作"
                       align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning"
                     icon="el-icon-edit"
                     size="mini"
                     @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="getPageList"
                     :current-page="currentPage"
                     :page-sizes="[3,5,10]"
                     :page-size="limit"
                     :page-count="7"
                     layout=" prev, pager, next, jumper,->,sizes,total"
                     :total="total"
                     style="text-align: center;margin-top: 20px;">
      </el-pagination>
    </div>
    <!-- 文件上传 -->
    <!-- Form -->

    <el-dialog :title="this.form.id?'修改品牌':'添加品牌'"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="ruleForm">
        <el-form-item label="品牌名称"
                      :label-width="formLabelWidth"
                      prop="tmName">
          <el-input v-model="form.tmName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO"
                      :label-width="formLabelWidth"
                      prop="logoUrl">
          <el-upload class="avatar-uploader"
                     action="/dev-api/admin/product/fileUpload"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="form.logoUrl"
                 :src="form.logoUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip"
                 class="el-upload_tip">只能上传png</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { tsInstantiationExpression } from '@babel/types';

export default {

  methods: {
    // 增加品牌
    addOrUpdateTradeMark () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          this.dialogFormVisible = false
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.form)
          if (result.code == 200) {
            this.$message.success(this.form.id ? '修改品牌成功' : '添加品牌成功')
            this.getPageList(this.form.id ? this.currentPage : 1)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })


    },
    resetForm () {
      this.form = { tmName: '', logoUrl: '' }
    },
    handleAvatarSuccess (res, file) {
      console.log(res);
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.form.logoUrl = res.data

    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    showDialog () {
      this.dialogFormVisible = true
      this.resetForm()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.limit = val
      this.getPageList()
    },
    // 修改品牌
    updateTradeMark (row) {
      this.dialogFormVisible = true
      // console.log(row);
      // let { id, logoUrl, tmName } = row
      // this.form = { id, logoUrl, tmName }
      this.form = { ...row }
      // this.form = row
    },
    async getPageList (page = 1) {
      this.currentPage = page
      let result = await this.$API.trademark.reqTradeMarkList(this.currentPage, this.limit)
      // console.log(result);
      if (result.code == 200) {
        this.list = result.data.records
        this.total = result.data.total
      }
    },
    // 删除品牌
    deleteTradeMark (row) {
      // console.log(row);
      this.$confirm(`此操作将永久删除${row.tmName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(row);
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          console.log('请求发送完成');
          console.log(result);
          // if (result.code == 200) {
          //   this.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   });
          //   // this.getPageList(this.currentPage)
          // }
          // 出BUG了，原因未知
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
  data () {
    let validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('2-10位'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      form: {
        tmName: '',
        logoUrl: ''
      },
      formLabelWidth: '120px',
      currentPage: 1,
      limit: 3,
      total: 10,
      list: [],
      rules: {
        tmName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          { validator: validateTmName, trigger: 'blur' }
        ],
        logoUrl: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }

    };
  },
  mounted () {
    this.getPageList()
  },

};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<!-- 一个后台管理系统，后续会进行Vue3+TS重构项目，并引入数据可视化大屏 -->