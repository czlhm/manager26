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
      <el-col :span="24">
        <div class="grid-content bg-purple btn-user">
          <el-button type="primary" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col :span="24">
        <el-table :data="rolesList" class="moder" style="width: 100%" border>
          <!-- 展开的table -->
          <el-table-column type="expand">
            <!-- 模板 -->
            <template slot-scope="props">
              <!-- 生成最左边的一级菜单 -->
              <el-row v-for="(item) in props.row.children" :key="item.id">
                <el-col :span="4">
                  <el-tag closable>{{item.authName}}</el-tag>
                  <!-- 小箭头 -->
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 二级菜单 用row嵌套即可-->
                <el-col :span="20">
                  <el-row v-for="level2 in item.children" :key="level2.id">
                    <el-col :span="4">
                      <el-tag closable type="success">{{level2.authName}}</el-tag>
                      <!-- 小箭头 -->
                      <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <!-- 三级菜单 跟二级菜单是平级的 -->
                    <el-col :span="20">
                      <el-tag
                        v-for="level3 in level2.children"
                        :key="level3.id"
                        closable
                        type="warning"
                      >{{level3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!-- 要么没有权限 -->
              <el-row v-if="props.row.children.length==0">
                <el-col :spam="24">没有分配权限</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="#" width="30" type="index"></el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
          <el-table-column prop="roleDesc" label="角色名称" width="300"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
              <el-button type="warning" plain size="mini" icon="el-icon-check"></el-button>
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
      leven3: "角色列表",
      // 角色的数据
      rolesList: []
    };
  },
  //生命周期函数
  async created() {
    let res = await this.$axios.get("roles");
    console.log(res);
    this.rolesList = res.data.data;
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

  .el-tag {
    margin: 2px;
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