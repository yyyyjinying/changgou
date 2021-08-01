<template>
  <div class="goods-list">
    <el-form :inline="true" :model="listForm" ref="listFormRef">
      <el-form-item label="商品名称">
        <el-input v-model="listForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌">
        <el-select v-model="listForm.brandId" placeholder="请选择">
          <el-option
            :key="index"
            v-for="(item, index) in brandOptions"
            :label="item.name"
            :value="item.id"
          ></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="host" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="listData" style="width: 100%" min-height="250">
      <el-table-column prop="id" label="编号" width="150" />
      <el-table-column prop="name" label="商品名称" width="150" />
      <el-table-column prop="name" label="价格/货号" width="150">
        <template slot-scope="scope">
          {{ scope.sn }}
        </template>
      </el-table-column>
      <el-table-column label="是否上架" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isMarketable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
            disabled
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="SKU库存" width="150">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="skuEdit(scope.row)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="saleNum" label="销量" width="150" />
      <el-table-column label="审核状态" width="150">
        <template slot-scope="scope">
          {{ scope.row.status.status == 1 ? "审核通过" : "未审核" }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            查看
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pagination.total"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      @current-change="currentChange"
    >
    </el-pagination>
    <sku-dialog ref="skuRef" />
  </div>
</template>
<script>
import { Request } from "common/utils";
import SkuDialog from "./skuList";
export default {
  data() {
    return {
      listData: [],
      listForm: {
        name: "",
        brandId: ""
      },
      brandOptions: [],
      pagination: {
        total: 20,
        pageNum: 1,
        pageSize: 4
      }
    };
  },
  methods: {
    skuEdit(record) {
      this.$refs.skuRef.setVisible(true, record);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    currentChange(pageNum) {
      this.pagination.pageNum = pageNum;
      this.listRequest();
    },
    search() {
      this.listRequest(this.listForm);
    },
    reset() {
      for (let key in this.listForm) {
        this.listForm[key] = "";
      }
      this.pagination.pageNum = 1;
      this.search();
    },
    async listRequest(params = {}) {
      const { pageNum, pageSize } = this.pagination;
      const res = await Request.post(
        `spu/search/${pageNum}/${pageSize}`,
        params
      );
      if (res.data.code === 20000) {
        const { list, pageNum, pageSize, total } = res.data.data;
        this.listData = list;
        this.pagination.currentPage = pageNum;
        this.pagination.pageSize = pageSize;
        this.pagination.total = total;
      }
    },
    async brandRequest() {
      const res = await Request.get(`brand`);
      if (res.data.code === 20000) {
        this.brandOptions = res.data.data;
      }
    }
  },
  mounted() {
    this.listRequest();
    this.brandRequest();
  },
  components: {
    SkuDialog
  }
};
</script>
<style scoped lang="stylus" ret="sheet/stylus">
.goods-list {
  margin: 20px 40px;
  >>> .el-pagination {
      margin:10px auto 40px;
      text-align :center;
  }
}
</style>
