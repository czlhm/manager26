<template>
  <div class="from-content">
    <div class="from-box">
      <h3>用户登录</h3>
      <el-form
        label-position="top"
        :rules="rules"
        ref="formLabelAlign"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-button class="btn-login" @click="submitForm('formLabelAlign')" type="primary">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      formLabelAlign: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入用密码", trigger: "change" },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("login", {
              username: this.formLabelAlign.name,
              password: this.formLabelAlign.password
            })
            .then(res => {
              console.log(res);

              //错误
              if (res.data.meta.status === 400) {
                this.$message.error(res.data.meta.msg);
              } else if (res.data.meta.status == 200) {
                //正确
                this.$message.success(res.data.meta.msg);
                //保存token sessionStorage
                window.sessionStorage.setItem("token", res.data.data.token);
                //成功跳转首页
                setTimeout(()=> {
                  this.$router.push("/");
                }, 1200);
              }
            });
        } else {
          this.$message.error("请输入用户名和密码!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.from-content {
  background-color: burlywood;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.from-box {
  width: 600px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 50px;
}

.btn-login {
  width: 100%;
}
</style>
