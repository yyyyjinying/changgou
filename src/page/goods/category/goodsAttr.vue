<template>
  <div>
    <el-form class="form" ref="form" :model="form" label-width="200px">
      <el-form-item label="规格参数数组">
        <el-input
          v-model="form.templateValue.name"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <div>
        <!-- 商品规格 -->
        <h1>商品规格</h1>
        <el-form-item
          v-for="(item, index) in specLists"
          :label="item.name"
          :key="index"
        >
          <el-checkbox-group :key="item.id" v-model="item.values">
            <el-checkbox
              v-for="(cItem, idx) in item.options.split(',')"
              :key="idx"
              :label="cItem"
              :name="String(item.id)"
              @change="checkboxClick(item)"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-table border :data="specTableData">
          <el-table-column
            v-for="(item, index) in specTableColumns"
            :key="index"
            :prop="item.value"
            :label="item.name"
          >
          </el-table-column>
          <el-table-column label="销售价格" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.price"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="商品库存" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.num"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="库存预警值" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.alertNum"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="SKU名称" width="180">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.name"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="deleteClick(scope.row)"
                type="text"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 商品参数  -->
        <h1>商品参数</h1>
        <el-table border :data="paraLists" style="width: 100%">
          <el-table-column prop="name" label="参数类型" width="180">
          </el-table-column>
          <el-table-column label="录入参数" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择">
                <template v-if="scope.row.options">
                  <el-option
                    v-for="(item, index) in scope.row.options &&
                      scope.row.options.split(',')"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </template>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <h1>商品相册</h1>
        <div class="g-list-img">
          <img src="" />
          <img src="" />
          <img src="" />
        </div>
        <h1>详情描述</h1>
        <v-editor />
      </div>
    </el-form>
    <div class="footer">
      <el-button type="host" @click="prev">上一步</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
import { Request, combinationCalculate } from "common/utils";
import VEditor from "common/components/base/vEditor";

export default {
  props: {
    categoryId: {
      type: Number,
      default: 560
    }
  },
  data() {
    return {
      specLists: [],
      paraLists: [],
      specTableData: [],
      specTableColumns: [],
      form: {
        templateValue: {},
        introduction: ""
      }
    };
  },
  methods: {
    deleteClick(row) {
      console.log(row);
    },
    prev() {
      this.$emit("setActive", 1);
    },
    submit() {
      this.$emit("submit", this.getFromData());
    },
    checkboxClick() {
      this._setSpecTableData();
    },
    _setSpecTableData() {
      let specTableColumns = [];
      let specArrs = this.specLists
        .map((item, index) => {
          item.values.length > 0 &&
            specTableColumns.push({
              value: `attr${index}`,
              name: item.name
            });
          return item.values.map(v => {
            return { [`attr${index}`]: v };
          });
        })
        .filter(item => item.length > 0);
      this.specTableColumns = specTableColumns;
      this.specTableData = combinationCalculate(specArrs);
    },
    getSpec() {
      this.specTableData.forEach(sItem => {
        let spec = {};
        for (let k in sItem) {
          this.specTableColumns.forEach(item => {
            if (item.value === k) {
              spec[item.name] = sItem[k];
            }
          });
        }
        sItem.spec = JSON.stringify(spec);
      });
      return this.specTableData;
    },
    getParaStr() {
      let para = {};
      this.paraLists.forEach(item => {
        para[item.name] = item.value;
      });
      return JSON.stringify(para);
    },
    getFromData() {
      const templateId = this.form.templateValue.id;
      const skuList = this.getSpec();
      const paraItems = this.getParaStr();
      return {
        templateId,
        skuList,
        paraItems,
        introduction: this.form.introduction
      };
    },
    async findTemplateName() {
      const res = await Request.get("template/category/" + this.categoryId);
      if (res.data.code === 20000) {
        this.form.templateValue = res.data.data;
      }
    },
    async findParaLists() {
      const res = await Request.get("para/category/" + this.categoryId);
      if (res.data.code === 20000) {
        this.paraLists = res.data.data.map(item => {
          item.value = "";
          return item;
        });
      }
    },
    async findSpecLists() {
      const res = await Request.get("spec/category/" + this.categoryId);
      if (res.data.code === 20000) {
        this.specLists = res.data.data.map(item => {
          item.values = [];
          return item;
        });
      }
    }
  },
  components: {
    VEditor
  },

  mounted() {
    this.findSpecLists();
    this.findTemplateName();
    this.findParaLists();
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.form {
  width: 1000px;
  margin: 40px auto;
  .edit-btn {
    color: blue;
  }
  .g-list-img{
      display:flex;
      img{
          margin:0 10px;
          width: 60px;
          height: 60px;
      }
  }

}
.footer{
  text-align:center;
}
</style>
