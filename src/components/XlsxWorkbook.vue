<template>
  <div v-if="libLoaded">
    <slot />
  </div>
</template>

<script>
import WorkbookHandler from "@/mixins/WorkbookHandler";

export default {
  mixins: [WorkbookHandler],
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      libLoaded: false
    };
  },
  provide() {
    return {
      addSheet: this.addSheet,
      deleteSheet: this.deleteSheet
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const {
        utils: { book_new, book_append_sheet }
      } = await import("xlsx");
      this._book_new = book_new;
      this._book_append_sheet = book_append_sheet;
      this._workbook = this._book_new(this.options);
      this.libLoaded = true;
    },
    addSheet(sheet, sheetName) {
      if (this._workbook) {
        this.deleteSheet(sheetName);
        this._book_append_sheet(this._workbook, sheet, sheetName);
      }
    },
    deleteSheet(sheetName) {
      if (this._workbook && this._workbook.Sheets[sheetName]) {
        this._workbook.SheetNames = this._workbook.SheetNames.filter(
          s => s !== sheetName
        );
        this._workbook.Sheets[sheetName] = undefined;
      }
    }
  }
};
</script>
