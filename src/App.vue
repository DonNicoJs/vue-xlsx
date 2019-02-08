<template>
  <div class="VueXlsx">
    <input type="file" @change="onChange" />
    <xlsx-parse :file="file">
      <xlsx-table />
    </xlsx-parse>
  </div>
</template>

<script>
import XlsxParse from "./components/XlsxParse";
import XlsxTable from "./components/XlsxTable";

export default {
  components: {
    XlsxParse,
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

<style></style>
