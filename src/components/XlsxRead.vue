<script>
import { globalPolyfill } from "../polyfills";
import WorkbookHandler from "../mixins/WorkbookHandler";

export default {
  mixins: [WorkbookHandler],
  props: {
    file: {
      type: null,
      default: null
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
    globalPolyfill();
    this.load();
  },
  methods: {
    async load() {
      const { read } = await import("xlsx");
      this._read = read;
      this.libLoaded = true;
      this._callbackQueue = [];
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
    }
  },
  render(h) {
    if (this.$slots.default && this.libLoaded) {
      return h("div", this.$slots.default);
    }
    return null;
  }
};
</script>
