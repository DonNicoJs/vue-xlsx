<template>
  <div v-if="table" v-html="table" />
</template>

<script>
import SheetTo from "../mixins/SheetTo";

export default {
  mixins: [SheetTo],
  data() {
    return {
      table: null
    };
  },
  mounted() {
    this._callBack = this.updateTable;
    this.load();
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
      const ws = workbook.Sheets[this.sheetNameFinder(workbook)];
      this.table = this._sheet_to_html(ws, this.options);
    }
  }
};
</script>
