<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{leven2}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{leven3}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
    //通过post,让外部传递数据
    props:['leven2','leven3']
};
</script>
<style>
</style>