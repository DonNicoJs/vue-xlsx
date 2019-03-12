<template>
  <div>
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
      </xlsx-read>
  </div>
</template>

<script>
import { XlsxRead, XlsxSheets } from "../../dist/vue-xlsx.es.js"

export default {
  components: {
    XlsxRead,
    XlsxSheets,
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
