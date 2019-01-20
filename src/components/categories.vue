<template>
  <div class="user-container">
    <!-- 顶部面包屑 -->
    <el-row class="el-breadcrumb">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <breadcrumb :leven2="leven2" :leven3="leven3"></breadcrumb>
        </div>
      </el-col>
    </el-row>
    <!-- 操纵框 -->
    <el-row class="frame">
      <el-col :span="8">
        <div class="grid-content bg-purple btn-input">
          <el-input placeholder="请输入内容" v-model="pageDate.query">
            <template slot="append">
              <i class="el-icon-search"></i>
            </template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple btn-user">
          <el-button type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 分类数据 -->
    <el-row>
      <el-col :span="24">
        <el-table :data="categoriesList" class="moder" style="width: 100%" border>
          <!-- 树形table -->
          <el-tree-grid
            prop="cat_name"
            label="分类名称"
            treeKey="cat_id"
            parentKey="cat_pid"
            levelKey="cat_level"
            childKey="children"
            :indentSize="30"
          ></el-tree-grid>
          <el-table-column label="#" width="30" height="40" type="index"></el-table-column>
          <el-table-column prop="cat_name" label="分类名称" width="500"></el-table-column>
          <el-table-column prop="cal_level" label="级别" width="100">
            <template slot-scope="prop">
              <span v-if="prop.row.cat_level===0">一级</span>
              <span v-if="prop.row.cat_level===1">二级</span>
              <span v-if="prop.row.cat_level===2">三级</span>
            </template>
          </el-table-column>
          <el-table-column prop label="是否有效" width="100">
            <template slot-scope="prop">{{prop.row.cat_deleted?'有效':'无效'}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pageDate.pagenum"
          :page-sizes="[2, 4, 6, 8,10]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 导入
import ElTreeGrid from "element-tree-grid";

export default {
  name: "categories",
  // 注册组件
  components: {
    ElTreeGrid
  },
  data() {
    return {
      leven2: "商品管理",
      leven3: "商品分类",
      //用户的数据
      pageDate: {
        type: 3,
        //页码
        pagenum: 1,
        //页容量
        pagesize: 6
      },
      // 总页数
      total: 0,
      // 分类的数据
      categoriesList: []
    };
  },
  //事件
  methods: {
    //获取分页数据的方法
    async getcategories() {
      // 从上往下执行代码
      let res = await this.$axios.get("categories", {
        params: this.pageDate
      });
      console.log(res);
      this.total = res.data.data.total;
      this.categoriesList = res.data.data.result;
    },
    // 页码改变
    currentChange(pagenum) {
      //修改页码 重新获取数据
      this.pageDate.pagenum = pagenum;
      this.getcategories();
    },
    //页容量改变
    sizeChange(pagesize) {
      //修改页容量
      this.pageDate.pagesize = pagesize;
      //重置页码
      this.pageDate.pagenum = 1;
      //重新获取数据
      this.getcategories();
    }
  },
  //生命周期函数
  async created() {
    //直接调用方法
    this.getcategories();
  }
};
</script>
<style lang="scss" scoped>
.user-container {
  padding: 0;
  margin: 0;
  .el-breadcrumb {
    background-color: #d3dce6;
    height: 45px;
    font-size: 15px;
    padding-left: 10px;
    line-height: 45px;
  }

  .frame {
    background-color: beige;
  }

  .btn-input,
  .btn-user {
    line-height: 0;
  }
  .btn-user {
    float: left;
  }
  thead {
    height: 45px;
  }
}
.moder {
  line-height: 0px;
}
</style>