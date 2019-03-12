<template>
  <div>
      <div>
        <input v-model="sheetName" placeholder="type a new sheet name" />
        <button v-if="sheetName" @click="addSheet">Add Sheet</button>
      </div>
      <div>Sheets: {{ sheets }}</div>
      <xlsx-workbook>
        <xlsx-sheet
          :collection="sheet.data"
          v-for="sheet in sheets"
          :key="sheet.name"
          :sheet-name="sheet.name"
          @parsed="onParsed"
        />
      </xlsx-workbook>
    </section>
  </div>
</template>

<script>
import { XlsxWorkbook, XlsxSheet } from "../../dist/vue-xlsx.es.js";

export default {
  components: {
    XlsxWorkbook,
    XlsxSheet
  },
  data() {
    return {
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      collection: [{ a: 1, b: 2 }]
    };
  },
  methods: {
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
      this.sheetName = null;
    },
    onParsed (sheet) {
      console.log(sheet)
    }
  }
};
</script>
