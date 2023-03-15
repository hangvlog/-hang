<template>
  <div>
    <el-table :data="tableData"
              height="250"
              border
              style="width: 100%">
      <el-table-column prop="date"
                       label="序号"
                       width="180"
                       align="center
             ">
      </el-table-column>
      <el-table-column prop="name"
                       label="品牌名称"
                       width="180"
                       align="center">
      </el-table-column>
      <el-table-column prop="address"
                       label="品牌LOGO"
                       align="center">
        <template slot-scope="{ row, $index }">
          {{ row,$index }}
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
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[2, 200, 300, 400]"
                     :page-size="100"
                     :page-count="7"
                     layout=" prev, pager, next, jumper,->,total, sizes"
                     :total="400"
                     style="text-align: center;margin-top: 20px;">
      </el-pagination>
    </div>
    <!-- 文件上传 -->
    <!-- Form -->
    <el-button type="primary"
               @click="dialogFormVisible = true">添加</el-button>

    <el-dialog title="收货地址"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域"
                      :label-width="formLabelWidth">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    async getTradeMarkList (page, limit) {
      await this.$API.trademark.reqAddOrUpdateTradeMark(page, limit)
    }
  },
  data () {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogImageUrl: '',
      dialogVisible: true,
      disabled: false,
      currentPage4: 15,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
    };
  },
  mounted () {
    // console.log(this.$API)
    // let tmp = this.getTradeMarkList(1, 3)
    // console.log(tmp);
  }
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