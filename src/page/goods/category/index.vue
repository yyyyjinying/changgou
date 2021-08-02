<template>
  <div>
    <el-steps class="steps" :active="active" finish-status="success">
      <el-step title="选择商品分类"> </el-step>
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品属性"></el-step>
    </el-steps>
    <c-menu
      @setActive="setActive"
      v-if="active == 0"
      @setCategoryIdArrs="setCategoryIdArrs"
    />
    <base-info
      v-if="active == 1"
      @setActive="setActive"
      :categoryIdArrs="categoryIdArrs"
      @setCategoryIdArrs="setCategoryIdArrs"
      @setBaseInfo="setBaseInfo"
      @setParaItems="setParaItems"
      ref="baseInfoRef"
    />
    <goods-attr
      @setActive="setActive"
      @submit="submit"
      ref="goodsAttrRef"
      v-if="active == 2"
      :categoryId="categoryIdArrs[2].id"
      :paraItems="paraItems"
    />
  </div>
</template>
<script>
import CMenu from "./cMenu";
import BaseInfo from "./baseInfo";
import GoodsAttr from "./goodsAttr";
import { Request } from "common/utils";
export default {
  data() {
    return {
      active: 0,
      paraItems: "",
      categoryIdArrs: [
        // 设置初始值用于调试
        // { id: 558, name: "手机" },
        // { id: 559, name: "手机通讯 " },
        // { id: 560, name: "手机" }
      ],
      baseInfo: {} // spu数据
    };
  },
  mounted() {
    this.initActive();
  },
  methods: {
    initActive() {
      const active = this.$route.query.active;
      if (active) {
        this.setActive(Number(active));
      } else {
        this.setActive(0);
      }
    },
    setParaItems(paraItems) {
      this.paraItems = paraItems;
    },
    setCategoryIdArrs(params) {
      this.categoryIdArrs = params;
    },
    setBaseInfo(data) {
      this.baseInfo = data;
    },
    setActive(active) {
      this.active = active;
    },
    async submit(goodsAttr) {
      const { templateId, skuList, paraItems } = goodsAttr;
      const id = this.$route.query.id;
      const res = await Request.post("spu/save", {
        spu: { id, ...this.baseInfo, templateId, paraItems },
        skuList: skuList.map(item => {
          item.sn = this.baseInfo.sn;
          return item;
        })
      });
      if (res.data.code === 20000) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
      }
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
