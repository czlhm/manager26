<template>
  <div class="main-container">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img src="../assets/logo.png" alt>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">电商后台管理系统</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-button @click="logout" type="success">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="201px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu v-for="(item, index) in menuList" :key="item.id" :index="item.order+''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 子菜单 -->
              <el-menu-item v-for="(it, i) in item.children" :key="it.id" index="1-1">
                <i class="el-icon-menu"></i>
                {{it.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    logout() {
      //注册在原型上的方法
      this.$confirm("你确定要退出么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          //编程式代码
          this.$router.push("login");
          this.$message({
            //成功退出
            type: "success",
            message: "成功退出!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "再看看!"
          });
        });
    }
  },
  //声明周期函数
  created() {
    this.$axios
      .get("menus", {
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res);
        this.menuList = res.data.data;
      });
  }
};
</script>
<style lang='scss' scoped>
//预处理 作用域
.main-container {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    .grid-content {
      font-size: 30px;
      color: white;
    }
    .el-menu {
      border: 0;
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-submenu_title {
    text-align: left;
  }
}
</style>