<template>
  <div v-if="table" v-html="table" />
</template>

<script>
export default {
  inject: ["getWorkbook"],
  props: {
    sheet: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      table: null,
      loaded: false
    };
  },
  computed: {
    loadedAndSheet() {
      return this.loaded ? this.sheet : null;
    }
  },
  mounted() {
    this._utils = this.getXlsxUtils();
  },
  watch: {
    loadedAndSheet: {
      immediate: true,
      handler(sheet) {
        if (sheet) {
          this.createTable();
        }
      }
    }
  },
  methods: {
    async load() {
      const {
        utils: { sheet_to_html }
      } = await import("xlsx");
      this._sheet_to_html = sheet_to_html;
      this.loaded = true;
    },
    async createTable() {
      const workbook = await this.getWorkbook();
      const sheetName = workbook.SheetNames[this.sheet];
      const ws = workbook.Sheets[sheetName];
      this.table = this._sheet_to_html(ws);
    }
  }
};
</script>

<style></style>
