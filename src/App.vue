<template>
  <div class="VueXlsx">
    <input type="file" @change="onChange" />
    <xlsx-parse :file="file" />
  </div>
</template>

<script>
import XlsxParse from "./components/XlsxParse";

export default {
  components: {
    XlsxParse
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
