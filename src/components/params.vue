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
    <!-- 提示框 -->
    <el-row class="mt">
      <el-col :span="24">
        <el-alert
          class="attentions"
          :closable="false"
          title="注意:只允许为第三级分类设置相关参数"
          type="warning"
          show-icon
        ></el-alert>
      </el-col>
    </el-row>
    <!-- 级联选择器 -->
    <el-row class="mt mm">
      <el-col :span="24">
        <span class="mr">请选择商品分类:</span>
        <el-cascader
          expand-trigger="hover"
          :options="paramList"
          v-model="selectedOptions2"
          :props="props"
        ></el-cascader>
      </el-col>
    </el-row>
    <!-- tabs -->
    <el-row class="mt mn">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="dynamic">
            <el-button type="primary">添加动态参数</el-button>
            <el-table class="moder" style="width: 100%" border>
              <el-table-column width="30"></el-table-column>
              <el-table-column label="#" width="30" height="40" type="index"></el-table-column>
              <el-table-column prop="username" label="商品参数" width="180"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                  <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
                  <el-button type="warning" plain size="mini" icon="el-icon-check"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="static">
            <el-button type="primary">添加静态参数</el-button>
            <el-table class="moder" style="width: 100%" border>
              <el-table-column label="#" width="30" height="40" type="index"></el-table-column>
              <el-table-column prop="username" label="属性名称" width="180"></el-table-column>
              <el-table-column prop="username" label="属性值" width="180"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                  <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
                  <el-button type="warning" plain size="mini" icon="el-icon-check"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leven2: "商品管理",
      leven3: "分类参数",
      // 用户的数据
      paramList: [],
      //选中的数据
      selectedOptions2: [],
      //别名
      props: {
        label: "cat_name",
        value: "cat_id"
      },
      // tabs命中的tab栏
      activeName: "dynamic"
    };
  },
  //生命周期函数
  async created() {
    let res = await this.$axios.get("categories?type=3");

    this.paramList = res.data.data;
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
}

.attentions {
  height: 40px;
}

.mm {
  text-align: left;
  line-height: 0;
}

.mn {
  text-align: left;
  line-height: 0;
}
</style>