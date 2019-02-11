<script>
export default {
  inject: ["getWorkbook"],
  props: {
    sheets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      innerValue: []
    };
  },
  mounted() {
    this.innerValue = [...this.sheets];
    this.getWorkbook(this.parseSheets);
  },
  methods: {
    parseSheets(wb) {
      this.innerValue = [...wb.SheetNames];
      this.$emit("update:sheets", [...wb.SheetNames]);
    }
  },
  render(h) {
    if (this.$scopedSlots.default) {
      return h("div", [
        this.$scopedSlots.default({
          sheets: this.innerValue
        })
      ]);
    }
    return null;
  }
};
</script>
