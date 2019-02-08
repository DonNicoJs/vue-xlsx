<template>
  <div v-if="libLoaded">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: File,
      default: null
    }
  },
  data() {
    return {
      libLoaded: false
    };
  },
  computed: {
    loadedAndfile() {
      return this.libLoaded ? this.file : null;
    }
  },
  watch: {
    loadedAndfile: {
      immediate: true,
      handler(file) {
        if (file) {
          this.parseFile(file);
        }
      }
    }
  },
  mounted() {
    this.load();
  },
  provide() {
    return {
      getWorkbook: this.getWorkbook
    };
  },
  methods: {
    async load() {
      this._xlsx = await import("xlsx");
      this.libLoaded = true;
    },
    parseFile(file) {
      const reader = new FileReader();
      reader.onload = e => {
        let binary = "";
        const bytes = new Uint8Array(e.target.result);
        const length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        this._workbook = this._xlsx.read(binary, { type: "binary" });
        console.log(this._workbook);
        this.$emit("parsed", this._workbook);
        if (this._resolve) {
          this._resolve(this._workbook);
        }
      };
      reader.onerror = e => {
        console.log(e);
        if (this._reject) {
          this._reject(this._workbook);
        }
      };
      reader.readAsArrayBuffer(file);
    },
    getWorkbook() {
      return new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
    }
  }
};
</script>

<style></style>
