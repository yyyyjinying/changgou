<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="选择商品分类">12</el-step>
      <el-step title="填写商品信息">34</el-step>
      <el-step title="填写商品属性">56</el-step>
    </el-steps>

    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
};
</script>
<style scoped></style>
