<template>
  <div class="VueXlsx">
    <input type="file" @change="onChange" />
    <xlsx-parse :file="file">
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
    </xlsx-parse>
  </div>
</template>

<script>
import XlsxParse from "./components/XlsxParse";
import XlsxTable from "./components/XlsxTable";
import XlsxSheets from "./components/XlsxSheets";
import XlsxJson from "./components/XlsxJson";

export default {
  components: {
    XlsxParse,
    XlsxTable,
    XlsxSheets,
    XlsxJson
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
