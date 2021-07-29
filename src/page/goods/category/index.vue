<template>
  <div>
    <el-steps class="steps" :active="active" finish-status="success">
      <el-step title="选择商品分类"> </el-step>
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品属性"></el-step>
    </el-steps>
    <c-menu v-if="active == 0" @setCategoryIdArrs="setCategoryIdArrs" />
    <base-info
      v-if="active == 1"
      @prev="prev"
      :categoryIdArrs="categoryIdArrs"
    />
    <goods-attr v-if="active == 2" :categoryId="560" />
    <!-- <goods-attr v-if="active == 2" :categoryId="categoryIdArrs[2].id" /> -->
    <div class="footer">
      <el-button v-if="active !== 0" type="host" @click="prev"
        >上一步</el-button
      >
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>
<script>
import CMenu from "./cMenu";
import BaseInfo from "./baseInfo";
import GoodsAttr from "./goodsAttr";
export default {
  data() {
    return {
      active: 2,
      categoryIdArrs: []
    };
  },
  methods: {
    next() {
      if (this.active === 2) return;
      this.active = this.active + 1;
    },
    prev() {
      if (this.active === 0) return;
      this.active = this.active - 1;
    },
    setCategoryIdArrs(params) {
      this.categoryIdArrs = params;
    }
  },
  components: {
    CMenu,
    BaseInfo,
    GoodsAttr
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
// @import "~common/stylus/index.styl";
.steps{
  width: 840px;
  margin: 0 auto;
}
.footer{
  display :flex;
  justify-content :center;
  padding-bottom: 40px;
}
</style>
