<template>
  <el-dialog
    @close="setVisible(false)"
    :destroy-on-close="true"
    class="sku-dialog"
    title="编辑货品信息"
    :visible="dialogTableVisible"
  >
    <el-form :inline="true" :model="formData" ref="searchRef">
      <el-form-item label="货号">
        <template>
          {{ formData.sn }}
        </template>
      </el-form-item>
      <el-form-item label="SKU编码">
        <el-input
          v-model="formData.name"
          @keyup.enter.native="search"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-table border :data="listData">
      <el-table-column label="SKU编码" width="250">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in specTableColumns"
        :key="index"
        :prop="item.value"
        :label="item.name"
      >
      </el-table-column>
      <el-table-column property="price" label="销售价格" width="200"
        ><template slot-scope="scope">
          <el-input
            v-model="scope.row.price"
            placeholder="请输入内容"
          ></el-input> </template
      ></el-table-column>
      <el-table-column property="num" label="商品库存"
        ><template slot-scope="scope">
          <el-input
            v-model="scope.row.num"
            placeholder="请输入内容"
          ></el-input> </template
      ></el-table-column>
      <el-table-column label="库存预警值">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.alertNum"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="footer">
      <el-button @click="setVisible(false)">取 消</el-button>
      <el-button type="primary" @click="setVisible(false)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { Request, parseJSON } from "common/utils";
export default {
  data() {
    return {
      formData: {
        categoryId: "",
        sn: "",
        name: ""
      },
      listData: [],
      specTableColumns: [],
      dialogTableVisible: false
    };
  },
  methods: {
    setVisible(bol = true, record) {
      this.dialogTableVisible = bol;

      if (bol) {
        const { category3Id, sn } = record;
        this.formData.sn = sn;
        this.formData.categoryId = category3Id;
        this.search();
      } else {
        this.reset();
      }
    },
    reset() {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
    },
    setColumn() {
      this.specTableColumns = [];
      let specJson = this.listData[0] ? this.listData[0].spec : "{}";
      let spec = parseJSON(specJson);
      let index = 0;
      for (let key in spec) {
        this.specTableColumns.push({ name: key, value: "attr" + index++ });
      }
    },
    async search() {
      const res = await Request.post(`sku/search`, this.formData);
      if (res.data.code === 20000) {
        this.listData = res.data.data;
        this.listData.forEach(item => {
          let spec = parseJSON(item.spec);
          let index = 0;
          for (let key in spec) {
            item["attr" + index++] = spec[key];
          }
        });
        this.setColumn();
      }
    }
  }
};
</script>
<style scoped lang="stylus" ref="sheet/stylus">
.sku-dialog {
  >>> .el-dialog__footer{
      text-align :center;
  }
}
</style>
