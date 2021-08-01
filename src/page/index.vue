<template>
  <div class="page">
    <div class="header">
      <Select />
    </div>
    <div class="container">
      <div class="slide">
        <el-tree
          :data="menuData"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
      <div class="warp">
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
      categoryData: [],
      menuData: [
        {
          name: "首页"
        },
        {
          name: "商品",
          children: [
            {
              name: "商品列表",
              children: [
                {
                  name: "商品列表",
                  path: "/goods/list"
                },
                {
                  name: "商品日志"
                }
              ]
            },
            {
              name: "添加商品",
              path: "/goods/add"
            },
            {
              name: "商品分类",
              children: [
                {
                  name: "商品分类"
                },
                {
                  name: "二级分类"
                },
                {
                  name: "三级分类"
                },
                {
                  name: "添加分类"
                }
              ]
            },
            {
              name: "规格参数模版",
              children: [
                {
                  name: "规格参数"
                },
                {
                  name: "规格列表"
                },
                {
                  name: "参数列表"
                },
                {
                  name: "添加规格"
                },
                {
                  name: "添加参数"
                }
              ]
            },
            {
              name: "品牌管理",
              children: [
                {
                  name: "品牌管理"
                },
                {
                  name: "添加新品牌"
                }
              ]
            },
            {
              name: "图片库管理",
              children: [
                {
                  name: "图片库管理"
                },
                {
                  name: "相册列表"
                },
                {
                  name: "新建相册"
                }
              ]
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
      data.path && this.$router.push(data.path);
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
