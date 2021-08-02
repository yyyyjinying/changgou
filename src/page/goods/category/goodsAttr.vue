<template>
  <div>
    <el-form
      :rules="rules"
      class="form"
      ref="goodsAttrForm"
      :model="form"
      label-width="200px"
    >
      <el-form-item label="规格参数数组">
        <el-input
          v-model="form.templateValue.name"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <div>
        <!-- 商品规格 -->
        <h1><i :style="{ color: 'red' }">*</i>商品规格</h1>
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
        <el-table
          class="spec-table"
          v-if="specTableData.length > 0"
          border
          :data="specTableData"
        >
          <el-table-column
            v-for="(item, index) in specTableColumns"
            :key="index"
            :prop="item.value"
            :label="item.name"
          >
          </el-table-column>
          <el-table-column
            :render-header="renderHeader"
            label="销售价格"
            width="180"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.price"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :render-header="renderHeader"
            label="商品库存"
            width="180"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.num"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :render-header="renderHeader"
            label="库存预警值"
            width="180"
          >
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
              <el-popconfirm title="确定删除吗？" @confirm="deleteClick(scope)">
                <el-button slot="reference" type="text" size="small"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 商品参数  -->
        <h1>商品参数</h1>
        <el-table border :data="paraLists" style="width: 100%">
          <el-table-column
            :render-header="renderHeader"
            prop="name"
            label="参数类型"
            width="180"
          >
          </el-table-column>
          <el-table-column
            :render-header="renderHeader"
            label="录入参数"
            width="180"
          >
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
import { Request, parseJSON, combinationCalculate } from "common/utils";
import VEditor from "common/components/base/vEditor";

export default {
  props: {
    categoryId: {
      type: Number,
      default: 560
    },
    paraItems: {
      type: String,
      default: "{}"
    }
  },
  data() {
    return {
      paraLists: [],
      specLists: [],
      specTableData: [],
      specTableColumns: [],
      form: {
        templateValue: {},
        introduction: ""
      },
      rules: {
        checkboxSpec: [
          { required: true, message: "请勾选规格", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        caption: [{ required: true, message: "请输入", trigger: "blur" }],
        sn: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    renderHeader(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("div", [h("i", "*"), h("span", column.label)]);
    },
    deleteClick(scope) {
      this.specTableData = this.specTableData.filter(
        (item, idx) => idx !== scope.$index
      );
    },
    prev() {
      this.$emit("setActive", 1);
    },
    _vSpec() {
      let sLock = false;
      for (let i = 0; i < this.specTableData.length; i++) {
        const item = this.specTableData[i];
        for (let key in item) {
          if (item[key] === null) {
            sLock = true;
            return;
          }
        }
      }
      return sLock;
    },
    _vPara() {
      let lock = false;
      for (let i = 0; i < this.paraLists.length; i++) {
        if (this.paraLists[i].value === "") {
          lock = true;
          break;
        }
      }
      return lock;
    },
    submit() {
      this.$refs.goodsAttrForm.validate(valid => {
        if (this.specTableData.length === 0) {
          this.$message("请勾选规格", "error");
          return;
        }
        if (this._vSpec()) {
          this.$message("请填写必填项规格", "error");
          return;
        }
        if (this._vPara()) {
          this.$message("请填写必填项参数", "error");
          return;
        }
        if (valid) {
          this.$emit("submit", this.getFromData());
        } else {
          return false;
        }
      });
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
      console.log("specArrs", specArrs);
      this.specTableData = combinationCalculate(specArrs, {
        price: null,
        num: null,
        alertNum: null,
        name: null
      });
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
    },
    async findSkuLists(spuId) {
      const res = await Request.post("sku/search", {
        spuId,
        categoryId: this.categoryId
      });
      if (res.data.code === 20000) {
        const list = res.data.data.sku;
        const specList = res.data.data.specList;
        const paraLists = res.data.data.paraList;
        const specValues = list.map(item => JSON.parse(item.spec));

        /**
         * 初始化paraLists
         */
        const paraItems = parseJSON(this.paraItems); // {"出厂年份":"2001","版本":"10"}
        paraLists.forEach(item => {
          if (item.name in paraItems) item.value = paraItems[item.name];
        });
        this.paraLists = paraLists;

        /**
         * 初始化specLists
         */
        let map = new Map();
        specValues.forEach(item => {
          for (let key in item) {
            if (!map.has(key)) {
              map.set(key, [item[key]]);
            } else {
              if (!map.get(key).includes(item[key])) {
                map.get(key).push(item[key]);
              }
            }
          }
        });
        specList.forEach(item => {
          item.values = map.has(item.name) ? map.get(item.name) : [];
        });
        this.specLists = specList;

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
        });
        this.specTableData = specArrs;
      }
    }
  },
  components: {
    VEditor
  },

  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.findSkuLists(id);
    } else {
      this.findSpecLists();
      this.findTemplateName();
      this.findParaLists();
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.form {
  >>> .el-table th>.cell{
    i {
      color: #f00;
      margin-right: 5px;
    }
    text-align :center;
  }
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
