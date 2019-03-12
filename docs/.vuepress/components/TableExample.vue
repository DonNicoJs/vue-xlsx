<template>
  <div>
      <h3>Import XLSX</h3>
      <input type="file" @change="onChange" />
      <xlsx-read :file="file">
        <xlsx-table />
      </xlsx-read>
  </div>
</template>

<script>
import { XlsxRead, XlsxTable } from "../../dist/vue-xlsx.es.js"

export default {
  components: {
    XlsxRead,
    XlsxTable
  },
  data() {
    return {
      file: null
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    }
  }
};
</script>
