<template>
  <div class="page">
    <div class="header">
      <Select />
    </div>
    <div class="container">
      <div class="slide">
        <el-tree
          :data="categoryData"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
      <div class="warp">
        <ul>
          <li class="cLi">1</li>
          <li class="cLi">2</li>
          <li class="cLi">3</li>
        </ul>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Select from "../common/components/base/select.vue";
import { Request } from "common/utils";
export default {
  data() {
    return {
      categoryData: [
        {
          name: "系统首页"
        },
        {
          name: "一级 2",
          children: [
            {
              name: "二级 2-1"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    async categoryRequest() {
      const res = await Request.get("category/tree/0");
      if (res.data.code === 20000) {
        this.categoryData = res.data.data;
      }
    }
  },
  mounted() {
    this.categoryRequest();
  },
  components: {
    Select
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.page{
    height:100%;
    display :flex;
    flex-direction :column;
  .header{
  }
  .container{
    height:100%;
    display:flex;
    flex-direction:row;
    .slide{
      width: 200px;
      border-right:1px solid #ccc;
    }
    .warp{
      flex:1;
    }
  }
}
</style>
