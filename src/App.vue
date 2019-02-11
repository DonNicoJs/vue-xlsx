<template>
  <div class="VueXlsx">
    <xlsx-write :collection="[{ a: 1, b: 2 }]">
      <xlsx-download />
    </xlsx-write>
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
  </div>
</template>

<script>
import XlsxRead from "./components/XlsxRead";
import XlsxTable from "./components/XlsxTable";
import XlsxSheets from "./components/XlsxSheets";
import XlsxJson from "./components/XlsxJson";
import XlsxWrite from "./components/XlsxWrite";
import XlsxDownload from "./components/XlsxDownload";

export default {
  components: {
    XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
    XlsxWrite,
    XlsxDownload
  },
  data() {
    return {
      file: null,
      selectedSheet: null
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    }
  }
};
</script>

<style></style>
