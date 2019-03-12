<template>
  <div>
    <xlsx-workbook @change="onChange" @created="onCreated"/>
  </div>
</template>

<script>
import { XlsxWorkbook } from "../../dist/vue-xlsx.es.js"

export default {
  components: {
    XlsxWorkbook,
  },
  data() {
    return {};
  },
  methods: {
    onCreated (wb) {
      console.log(wb)
    },
    onChange(wb) {
     console.log(wb)
    }
  }
};
</script>
