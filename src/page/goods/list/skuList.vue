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
    <el-table border :data="specTableData">
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
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { Request } from "common/utils";
export default {
  data() {
    return {
      formData: {
        sn: "",
        spuId: "",
        name: ""
      },
      specTableData: [],
      specTableColumns: [],
      dialogTableVisible: false
    };
  },
  methods: {
    async submit() {
      const res = await Request.post("sku/saveSkuSpec", this.specTableData);
      if (res.data.code === 20000) {
        this.$message(res.data.message, "success");
        this.setVisible(false);
      }
    },
    setVisible(bol = true, record) {
      this.dialogTableVisible = bol;

      if (bol) {
        const { id, sn } = record;
        this.formData.sn = sn;
        this.formData.spuId = id;
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
    async search() {
      const res = await Request.post("sku/skuList", this.formData);
      if (res.data.code === 20000) {
        const list = res.data.data;
        const specValues = list.map(item => JSON.parse(item.spec));
        /**
         * 初始化specTableColumns
         */
        const columns = [];
        let index = 0;
        for (let key in specValues[0]) {
          columns.push({ name: key, value: `attr${index}` });
          index++;
        }
        this.specTableColumns = columns;

        /**
         * 初始化specTableData
         */
        let specArrs = [];
        specValues.forEach(item => {
          let record = {};
          this.specTableColumns.forEach(cItem => {
            if (cItem.name in item) {
              record[cItem.value] = item[cItem.name];
            }
          });
          specArrs.push(record);
        });
        specArrs.forEach((sItem, index) => {
          sItem.price = list[index].price;
          sItem.num = list[index].num;
          sItem.alertNum = list[index].alertNum;
          sItem.name = list[index].name;
          sItem.id = list[index].id;
        });
        this.specTableData = specArrs;
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
