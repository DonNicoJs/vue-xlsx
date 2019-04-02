<script>
import WorkbookHandler from "../mixins/WorkbookHandler";

export default {
  mixins: [WorkbookHandler],
  props: {
    file: {
      type: null,
      default: null
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    loadedAndFile() {
      return this.libLoaded ? this.file : null;
    }
  },
  watch: {
    loadedAndFile: {
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
  methods: {
    async load() {
      const { globalPolyfill } = require("../polyfills");
      globalPolyfill();
      const { read } = await import("xlsx");
      this._read = read;
      this.libLoaded = true;
      this._callbackQueue = [];
    },
    parseFile(file) {
      this.startLoading();
      const reader = new FileReader();
      reader.onload = e => {
        let binary = "";
        const bytes = new Uint8Array(e.target.result);
        const length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        this._workbook = this._read(binary, {
          type: "binary",
          ...this.options
        });
        this.fireCallBacks();
        this.$emit("parsed", this._workbook);
        this.endLoading();
      };
      reader.onerror = e => {
        console.log(e);
      };
      reader.readAsArrayBuffer(file);
    }
  },
  render(h) {
    if (this.$scopedSlots.default && this.libLoaded) {
      return h("div", [
        this.$scopedSlots.default({
          loading: this.loading
        })
      ]);
    }
    return null;
  }
};
</script>
