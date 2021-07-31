<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <ul v-if="categoryFirstData.length > 0">
          <li
            :class="fIndex == index ? 'hover' : ''"
            @click="selectSecondByPid(item, index)"
            v-for="(item, index) in categoryFirstData"
            :key="item.id"
          >
            {{ item.name }}
            <i v-show="fIndex == index">></i>
          </li>
        </ul>
      </div>
      <div class="center">
        <ul v-if="categorySecondData.length > 0">
          <li
            :class="sIndex == index ? 'hover' : ''"
            @click="selectThirdByPid(item, index)"
            v-for="(item, index) in categorySecondData"
            :key="item.id"
          >
            {{ item.name }}
            <i v-show="sIndex == index">></i>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul v-if="categoryThirdData.length > 0">
          <li
            :class="tIndex == index ? 'hover' : ''"
            @click="selectEndPid(item, index)"
            v-for="(item, index) in categoryThirdData"
            :key="item.id"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { Request } from "common/utils";

export default {
  data() {
    return {
      cItem: [],
      fIndex: -1,
      sIndex: -1,
      tIndex: -1,
      categoryFirstData: [],
      categorySecondData: [],
      categoryThirdData: []
    };
  },
  methods: {
    next() {
      if (this.cItem[2]) {
        this.$emit("setActive", 1);
      } else {
        this.$message("请选择三级分类");
      }
    },
    async selectFirstByPid(pid = 0) {
      const res = await Request.get("category/pid/" + pid);
      if (res.data.code === 20000) {
        this.cItem = [];
        this.fIndex = -1;
        this.sIndex = -1;
        this.tIndex = -1;
        this.categoryFirstData = res.data.data;
        this.categorySecondData = [];
        this.categoryThirdData = [];
      }
    },
    async selectSecondByPid(item, index) {
      const res = await Request.get("category/pid/" + item.id);
      if (res.data.code === 20000) {
        this.cItem[0] = {
          name: item.name,
          id: item.id,
          templateId: item.templateId
        };
        this.fIndex = index;
        this.sIndex = -1;
        this.tIndex = -1;
        this.categorySecondData = res.data.data;
        this.categoryThirdData = [];
      }
    },
    async selectThirdByPid(item, index) {
      const res = await Request.get("category/pid/" + item.id);
      if (res.data.code === 20000) {
        this.cItem[1] = { name: item.name, id: item.id };
        this.sIndex = index;
        this.tIndex = -1;
        this.categoryThirdData = res.data.data;
      }
    },
    selectEndPid(item, index) {
      this.tIndex = index;
      this.cItem[2] = {
        name: item.name,
        id: item.id,
        templateId: item.templateId
      };
      this.$emit("setCategoryIdArrs", this.cItem); // 使用$emit()引入父组件中的方法
    }
  },
  mounted() {
    this.selectFirstByPid(0);
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
// @import "~common/stylus/index.styl";
.container{
  .main{
      display: flex;
      flex-direction:row;
      margin: 40px 60px;
      align-items :top;
      ul{
        border: 1px solid rgba(228, 228, 228,1);
        border-top: 0px;

        li{
          line-height 36px;
          padding: 0 10px;
          border-top: 1px solid rgba(228, 228, 228,1);
          cursor: pointer;
          display:flex;
          i{
            margin-left: auto;
          }
          &.hover{
            background: rgba(242, 242, 242, 1);
            color: #0099FF;
          }
          &:hover{
            background: rgba(242, 242, 242, 1);
          }
        }
      }

    .left{
        flex: 1;
        margin-right:20px;
    }
    .center{
        flex: 1;
        margin: 0 20px;
        ul{
          position:relative;
          &:after{
            content: ">>";
            display :"block";
            position: absolute;
            left: -30px;
            top: 50%;
            margin-top: -10px;
          }
        }
    }
    .right{
        flex: 1;
        margin-left: 20px;
        ul{
          position:relative;
          &:after{
            content: ">>";
            display :"block";
            position: absolute;
            left: -30px;
            top: 50%;
            margin-right: 20px;
            margin-top: -10px;
          }
        }
    }
  }
  .footer{
    text-align :center;
  }
}
</style>
