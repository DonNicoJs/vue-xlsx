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
          this.getWorkbook(this.download);
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
    download(workbook) {
      console.log(workbook);
      this._writeFile(workbook, this.filename, this.options);
    }
  },
  render() {
    return null;
  }
};
</script>
