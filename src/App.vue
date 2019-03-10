<template>
  <div class="VueXlsx">
    <section>
      <h3>Create XLSX</h3>
      <div>
        <input v-model="sheetName" placeholder="type a new sheet name" />
        <button v-if="sheetName" @click="addSheet">Add Sheet</button>
      </div>

      <div>
        <input type="file" @change="onJsonFileChange" />
      </div>
      <div>Sheets: {{ sheets }}</div>

      <xlsx-workbook>
        <xlsx-sheet
          :collection="sheet.data"
          v-for="sheet in sheets"
          :key="sheet.name"
          :sheet-name="sheet.name"
        />
        <xlsx-sheet
          :collection="jsonFile"
          v-if="jsonFile"
          sheet-name="fromJson"
        />
        <xlsx-download>
          <button>Download</button>
        </xlsx-download>
      </xlsx-workbook>
    </section>
    <hr />
    <section>
      <h3>Import XLSX</h3>
      <input type="file" @change="onChange" />
      <xlsx-read :file="file">
        <xlsx-sheets>
          <template #default="{sheets}">
            <select v-model="selectedSheet">
              <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                {{ sheet }}
              </option>
            </select>
          </template>
        </xlsx-sheets>
        <xlsx-table :sheet="selectedSheet" />
        <xlsx-json :sheet="selectedSheet">
          <template #default="{collection}">
            <div>
              {{ collection }}
            </div>
          </template>
        </xlsx-json>
      </xlsx-read>
    </section>
  </div>
</template>

<script>
import XlsxRead from "./components/XlsxRead";
import XlsxTable from "./components/XlsxTable";
import XlsxSheets from "./components/XlsxSheets";
import XlsxJson from "./components/XlsxJson";
import XlsxWorkbook from "./components/XlsxWorkbook";
import XlsxSheet from "./components/XlsxSheet";
import XlsxDownload from "./components/XlsxDownload";

export default {
  components: {
    XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  data() {
    return {
      file: null,
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      collection: [{ a: 1, b: 2 }],
      jsonFile: null
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    onJsonFileChange(event) {
      const reader = new FileReader();
      reader.onload = evt => {
        this.jsonFile = JSON.parse(evt.target.result);
      };
      reader.readAsText(event.target.files[0]);
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
      this.sheetName = null;
    }
  }
};
</script>

<style></style>
