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
      ref="baseInfoRef"
    />
    <goods-attr
      ref="goodsAttrRef"
      v-if="active == 2"
      :categoryId="categoryIdArrs[2].id"
    />
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
      categoryIdArrs: [
        // 设置初始值用于调试
        { id: 558, name: "手机" },
        { id: 559, name: "手机通讯 " },
        { id: 560, name: "手机" }
      ],
      baseInfo: {}, // spu数据
      goodsAttr: {} // sku数据
    };
  },
  methods: {
    next() {
      if (this.active === 2) {
        this.goodsAttr = this.$refs.goodsAttrRef.getFromData();
        return;
      }
      if (this.active === 1) {
        this.baseInfo = this.$refs.baseInfoRef.getFromData();
      }
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
