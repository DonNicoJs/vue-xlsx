<script>
export default {
  inject: ["getWorkbook"],
  data() {
    return {
      innerValue: []
    };
  },
  mounted() {
    this.getWorkbook(this.parseSheets);
  },
  methods: {
    parseSheets(wb) {
      this.innerValue = [...wb.SheetNames];
      this.$emit("parsed", [...wb.SheetNames]);
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
