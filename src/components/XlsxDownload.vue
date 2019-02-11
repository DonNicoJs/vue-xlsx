<template>
  <div v-if="loaded" @click="download">
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ["getWorkbook"],
  props: {
    filename: {
      type: String,
      default: "my-workbook.xlsx"
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    this.load();
  },
  watch: {
    loaded: {
      immediate: true,
      handler(loaded) {
        if (loaded) {
          this.getWorkbook(wb => {
            this._workbook = wb;
          });
        }
      }
    }
  },
  methods: {
    async load() {
      const { writeFile } = await import("xlsx");
      this._writeFile = writeFile;
      this.loaded = true;
    },
    download() {
      this._writeFile(this._workbook, this.filename, this.options);
    }
  },
  render() {
    return null;
  }
};
</script>
