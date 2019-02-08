<template>
  <div v-if="table" v-html="table" />
</template>

<script>
export default {
  inject: ["getWorkbook", "getXlsxUtils"],
  props: {
    sheet: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      table: null
    };
  },
  mounted() {
    this._utils = this.getXlsxUtils();
  },
  watch: {
    sheet: {
      immediate: true,
      handler() {
        this.createTable();
      }
    }
  },
  methods: {
    async createTable() {
      const workbook = await this.getWorkbook();
      const sheetName = workbook.SheetNames[this.sheet];
      const ws = workbook.Sheets[sheetName];
      this.table = this._utils.sheet_to_html(ws);
    }
  }
};
</script>

<style></style>
