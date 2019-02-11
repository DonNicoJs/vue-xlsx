<template>
  <div v-if="table" v-html="table" />
</template>

<script>
export default {
  inject: ["getWorkbook"],
  props: {
    sheet: {
      type: [String, Number],
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
    this.load();
  },
  watch: {
    loadedAndSheet: {
      immediate: true,
      handler(sheet) {
        if (sheet !== null) {
          this.getWorkbook(this.updateTable);
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
    updateTable(workbook) {
      const sheetName = Number.isInteger(this.sheet)
        ? workbook.SheetNames[this.sheet]
        : this.sheet;
      const ws = workbook.Sheets[sheetName];
      this.table = this._sheet_to_html(ws);
    }
  }
};
</script>

<style></style>
