<template>
  <el-select v-model="value" placeholder="请选择" @change="onChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "zh",
          label: "中文"
        },
        {
          value: "en",
          label: "English"
        }
      ],
      value: "zh"
    };
  },
  methods: {
    onChange(e) {
      this.$i18n.locale = e;
    }
  }
};
</script>
<style scoped></style>
