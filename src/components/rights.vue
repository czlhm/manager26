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
        <el-table :data="rightsList" class="moder" style="width: 100%" border>
          <el-table-column label="#" width="60" height="40" type="index"></el-table-column>
          <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
          <el-table-column prop="path" label="路径" width="300"></el-table-column>
          <el-table-column prop="level" label="层级" width="300">
            <template slot-scope="scope">
              <span v-if="scope.row.level=='0'">一级</span>
              <span v-if="scope.row.level=='1'">二级</span>
              <span v-if="scope.row.level=='2'">三级</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leven2: "权限管理",
      leven3: "权限列表",
      // 用户的数据
      rightsList: []
    };
  },
  //生命周期函数
  async created() {
    let res = await this.$axios.get("rights/list");
    console.log(res);
    this.rightsList = res.data.data;
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