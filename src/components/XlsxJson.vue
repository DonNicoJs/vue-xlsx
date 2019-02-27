<script>
import SheetTo from "../mixins/SheetTo";

export default {
  mixins: [SheetTo],
  data() {
    return {
      collection: null
    };
  },
  mounted() {
    this._callBack = this.updateJson;
    this.load();
  },
  methods: {
    async load() {
      const {
        utils: { sheet_to_json }
      } = await import("xlsx");
      this._sheet_to_json = sheet_to_json;
      this.loaded = true;
    },
    updateJson(workbook) {
      const ws = workbook.Sheets[this.sheetNameFinder(workbook)];
      this.collection = this._sheet_to_json(ws, this.options);
      this.$emit("parsed", this.collection);
    }
  },
  render(h) {
    if (this.$scopedSlots.default && this.loaded) {
      return h("div", [
        this.$scopedSlots.default({
          collection: this.collection
        })
      ]);
    }
    return null;
  }
};
</script>
