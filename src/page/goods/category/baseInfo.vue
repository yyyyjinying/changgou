<template>
  <el-form class="form" ref="form" :model="form" label-width="80px">
    <el-form-item label="商品名称">
      <span v-for="(item, index) in categoryIdArrs" :key="index">
        <i v-show="index !== 0"> > </i> {{ item.name }}</span
      >
      <el-button class="edit-btn" type="primary" @click="prev">编辑</el-button>
    </el-form-item>
    <el-form-item label="商品名称">
      <el-input v-model="form.name" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="form.name" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="商品品牌">
      <el-select v-model="form.region" placeholder="请选择品牌">
        <template v-if="brandOptions.length > 0">
          <el-option
            v-for="(item, index) in brandOptions"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="商品介绍">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item label="运费模版">
      <el-select v-model="form.region" placeholder="请选择运费模版">
        <!-- <template v-if="brandOptions.length > 0">
          <el-option
            v-for="(item, index) in brandOptions"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </template> -->
      </el-select>
    </el-form-item>
    <el-form-item label="商品货号">
      <el-input v-model="form.name" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="服务保证">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="无忧退货" name="type"></el-checkbox>
        <el-checkbox label="快速退款" name="type"></el-checkbox>
        <el-checkbox label="免费包邮" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Request } from "common/utils";
export default {
  props: {
    categoryIdArrs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      brandOptions: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    prev() {
      this.$emit("prev");
    },
    onSubmit() {
      //   const aa = this.form;
      debugger;
    },
    async findBrandByCategory() {
      const id = this.categoryIdArrs[2].id;
      const res = await Request.get("brand/category/" + id);
      if (res.data.code === 20000) {
        this.brandOptions = res.data.data;
      }
    }
  },
  mounted() {
    this.findBrandByCategory();
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.form {
  width: 600px;
  margin: 40px auto;
  .edit-btn {
    color: blue;
  }
}
</style>
