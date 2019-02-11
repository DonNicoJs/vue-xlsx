<template>
  <div class="VueXlsx">
    <input type="file" @change="onChange" />
    <xlsx-parse :file="file">
      <xlsx-sheets :sheets.sync="sheets">
        <template #default="{sheets}">
          <select>
            <option v-for="sheet in sheets" :key="sheet" :value="sheet">
              {{ sheet }}
            </option>
          </select>
        </template>
      </xlsx-sheets>
      <xlsx-table :sheet="sheets[0]" />
    </xlsx-parse>
  </div>
</template>

<script>
import XlsxParse from "./components/XlsxParse";
import XlsxTable from "./components/XlsxTable";
import XlsxSheets from "./components/XlsxSheets";

export default {
  components: {
    XlsxParse,
    XlsxTable,
    XlsxSheets
  },
  data() {
    return {
      file: null,
      sheets: []
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
