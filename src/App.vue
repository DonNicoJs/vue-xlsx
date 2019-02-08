<template>
  <div class="VueXlsx">
    <input
      type="file"
      @change="onChange"
    >
    <xlsx-parse />
  </div>
</template>

<script>
import XlsxParse from './components/XlsxParse';

export default {
  components: {
    XlsxParse
  },
  methods: {
    onChange (event) {
      console.log(event);
    }
  }
};
</script>

<style>

</style>
