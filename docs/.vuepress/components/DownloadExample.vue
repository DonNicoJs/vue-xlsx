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
      />
      <xlsx-download>
        <button>Download</button>
      </xlsx-download>
      <xlsx-download disable-wrapper-click>
        <template #default="{download}">
          <button  @click="download">Download with slot scope</button>
        </template>
      </xlsx-download>
    </xlsx-workbook>
  </div>
</template>

<script>
import { XlsxWorkbook, XlsxSheet, XlsxDownload } from "../../dist/vue-xlsx.es.js"

export default {
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  data() {
    return {
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      collection: [{ a: 1, b: 2 }],
    };
  },
  methods: {
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
      this.sheetName = null;
    }
  }
};
</script>
