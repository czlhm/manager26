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
    <!-- 表格 -->
    <el-row>
      <el-col :span="24">
        <el-table :data="goodsList" class="moder" style="width: 100%" border>
          <el-table-column label="#" width="30" height="40" type="index"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
          <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
          <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
          <el-table-column prop="add_time" label="创建时间" width="250">
            <template slot-scope="prop">{{prop.row.add_time | beautifyTime}}</template>
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
export default {
  name: "goods",
  data() {
    return {
      leven2: "商品管理",
      leven3: "商品列表",
      //用户的数据
      pageDate: {
        query: "",
        //页码
        pagenum: 1,
        //页容量
        pagesize: 6
      },
      // 总页数
      total: 0,
      // 商品的数据
      goodsList: []
    };
  },
  //事件
  methods: {
    //获取分页数据的方法
    async getGoods() {
      // 从上往下执行代码
      let res = await this.$axios.get("goods", {
        params: this.pageDate
      });
      this.total = res.data.data.total;
      this.goodsList = res.data.data.goods;
    },
    // 页码改变
    currentChange(pagenum) {
      //修改页码 重新获取数据
      this.pageDate.pagenum = pagenum;
      this.getGoods();
    },
    //页容量改变
    sizeChange(pagesize){
      //修改页容量
      this.pageDate.pagesize = pagesize;
      //重置页码
      this.pageDate.pagenum = 1;
      //重新获取数据
      this.getGoods();
    }
  },
  //生命周期函数
  async created() {
    //直接调用方法
    this.getGoods();
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