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
    <!-- 表格 -->
    <el-row>
      <el-col :span="24">
        <el-table :data="ordersList" class="moder" style="width: 100%" border>
          <el-table-column label="#" width="40" type="index"></el-table-column>
          <el-table-column prop="order_number" label="订单编号" width="255"></el-table-column>
          <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
          <el-table-column prop="goods_weight" label="是否付款" width="100">
            <template slot-scope="prop">
              <el-button type="danger" v-if="prop.row.pay_status==='0'">未付款</el-button>
              <el-button type="success" v-else>已付款</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货" width="250"></el-table-column>
          <el-table-column prop="create_time" label="下单时间" width="250">
            <template slot-scope="prop">{{prop.row.create_time | beautifyTime}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
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
  name: "orders",
  data() {
    return {
      leven2: "订单管理",
      leven3: "订单列表",
      //用户的数据
      pageDate: {
        //页码
        pagenum: 1,
        //页容量
        pagesize: 6
      },
      // 总页数
      total: 0,
      // 订单的数据
      ordersList: []
    };
  },
  //事件
  methods: {
    //获取分页数据的方法
    async getOrders() {
      // 从上往下执行代码
      let res = await this.$axios.get("orders", {
        params: this.pageDate
      });
      console.log(res);
      this.total = res.data.data.total;
      this.ordersList = res.data.data.goods;
    },
    // 页码改变
    currentChange(pagenum) {
      //修改页码 重新获取数据
      this.pageDate.pagenum = pagenum;
      this.getOrders();
    },
    //页容量改变
    sizeChange(pagesize) {
      //修改页容量
      this.pageDate.pagesize = pagesize;
      //重置页码
      this.pageDate.pagenum = 1;
      //重新获取数据
      this.getOrders();
    }
  },
  //生命周期函数
  async created() {
    //直接调用方法
    this.getOrders();
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