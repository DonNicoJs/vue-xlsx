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
      const { read } = await import("xlsx");
      this._read = read;
      this.libLoaded = true;
      this._callbackQueue = [];
    },
    fireCallBacks() {
      if (this._callbackQueue && Array.isArray(this._callbackQueue)) {
        this._callbackQueue.forEach(cb => {
          try {
            cb(this._workbook);
          } catch (e) {
            console.warning("error in firing callbacks", e);
          }
        });
      }
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
        this._workbook = this._read(binary, { type: "binary" });
        this.fireCallBacks();
        this.$emit("parsed", this._workbook);
      };
      reader.onerror = e => {
        console.log(e);
      };
      reader.readAsArrayBuffer(file);
    },
    getWorkbook(cb) {
      this._callbackQueue.push(cb);
      if (this._workbook) {
        cb(this._workbook);
      }
    }
  }
};
</script>

<style></style>
