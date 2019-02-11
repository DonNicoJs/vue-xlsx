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
