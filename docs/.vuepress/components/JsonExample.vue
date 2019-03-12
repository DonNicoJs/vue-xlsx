<template>
  <div>
    <h3>Import XLSX</h3>
    <input type="file" @change="onChange" />
    <xlsx-read :file="file">
      <xlsx-json>
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
import { XlsxRead, XlsxJson } from "../../dist/vue-xlsx.es.js"

export default {
  components: {
    XlsxRead,
    XlsxJson
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
