<template>
  <el-form
    class="form"
    :rules="rules"
    ref="baseInfoForm"
    :model="form"
    label-width="80px"
  >
    <el-form-item label="商品分类">
      <span v-for="(item, index) in categoryIdArrs" :key="index">
        <i v-show="index !== 0"> > </i> {{ item.name }}</span
      >
      <el-button class="edit-btn" type="primary" @click="prev">编辑</el-button>
    </el-form-item>
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
    </el-form-item>
    <el-form-item label="副标题" prop="caption">
      <el-input v-model="form.caption" placeholder="请输入副标题"></el-input>
    </el-form-item>
    <el-form-item label="商品品牌">
      <el-select v-model="form.brandId" placeholder="请选择品牌">
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
      <el-input type="textarea" v-model="form.introduction"></el-input>
    </el-form-item>
    <el-form-item label="运费模版">
      <el-select v-model="form.freightId" placeholder="请选择运费模版">
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
    <el-form-item label="商品货号" prop="sn">
      <el-input v-model="form.sn" placeholder="请输入商品货号"></el-input>
    </el-form-item>
    <el-form-item label="服务保证">
      <el-checkbox-group v-model="form.saleService">
        <el-checkbox label="无忧退货" name="type"></el-checkbox>
        <el-checkbox label="快速退款" name="type"></el-checkbox>
        <el-checkbox label="免费包邮" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <div class="footer">
      <el-button type="host" @click="prev">上一步</el-button>
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
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
      brandOptions: [], // 品牌数据
      form: {
        name: "", // 商品名称
        caption: "", // 商品副标题
        brandId: "", // 品牌ID
        introduction: "", // 商品介绍
        freightId: "", // 运费模板
        saleService: [], // 售后服务
        sn: "" // 商品货号
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        caption: [{ required: true, message: "请输入", trigger: "blur" }],
        sn: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    prev() {
      this.$emit("setActive", 0);
    },
    next() {
      this.$refs.baseInfoForm.validate(valid => {
        if (valid) {
          this.$emit("setBaseInfo", this.getFromData());
          this.$emit("setActive", 2);
        } else {
          return false;
        }
      });
    },
    getFromData() {
      const category1Id = this.categoryIdArrs[0].id;
      const category2Id = this.categoryIdArrs[1].id;
      const category3Id = this.categoryIdArrs[2].id;
      const saleService = this.form.saleService.join(",");
      return {
        ...this.form,
        saleService,
        category1Id,
        category2Id,
        category3Id
      };
    },
    async findBrandByCategory() {
      const id = this.categoryIdArrs[2] && this.categoryIdArrs[2].id;
      const res = await Request.get("brand/category/" + id);
      if (res.data.code === 20000) {
        this.brandOptions = res.data.data;
      }
    }
  },
  mounted() {
    console.log("baseInfo");
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
  .footer{
    text-align :center;
  }
}
</style>
