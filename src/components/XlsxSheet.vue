<script>
import { collectionValidator, typeFinder } from "../utils.js";

export default {
  inject: ["getWorkbook", "addSheet", "deleteSheet"],
  props: {
    sheetName: {
      type: String,
      required: true
    },
    collection: {
      type: Array,
      default: null,
      validator(value) {
        if (value && value.length > 0) {
          const type = collectionValidator(value);
          return ["array", "object"].includes(type);
        }
        return true;
      }
    }
  },
  data() {
    return {
      libLoaded: false
    };
  },
  computed: {
    readyToParse() {
      return this.libLoaded ? this.collection : null;
    }
  },
  watch: {
    readyToParse: {
      immediate: true,
      handler(collection) {
        if (collection) {
          this.parseCollection(collection);
        }
      }
    }
  },
  mounted() {
    this.load();
  },
  beforeDestroy() {
    this.deleteSheet(this.sheetName);
  },
  methods: {
    async load() {
      const {
        utils: { aoa_to_sheet, json_to_sheet }
      } = await import("xlsx");
      this._aoa_to_sheet = aoa_to_sheet;
      this._json_to_sheet = json_to_sheet;
      this.libLoaded = true;
      this.getWorkbook(wb => {
        this._workbook = wb;
      });
    },
    parseCollection(collection) {
      const type = typeFinder(collection[0]);
      const lib = {
        array: this._aoa_to_sheet,
        object: this._json_to_sheet
      };
      this._sheet = lib[type](collection, this.options);
      this.$emit("parsed", this._sheet);
      this.addSheet(this._sheet, this.sheetName);
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
