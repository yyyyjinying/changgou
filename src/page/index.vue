<template>
  <div class="page">
    <div class="header">
      <Select />
    </div>
    <div class="container">
      <div class="slide">
        <!-- <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-row> -->
      </div>
      <div class="warp">
        <span>{{ $t("message") }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Select from "../common/components/select.vue";
export default {
  data() {
    return {
      aa: "aa"
    };
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
      width: 400px;
    }
    .warp{
      flex:1;
    }
  }
}
</style>
