<script>
export default {
  inject: ["getWorkbook"],
  props: {
    sheets: {
      type: Array,
      default: () => []
    },
    selected: {
      type: String,
      default: null
    }
  },
  mounted() {
    this.getWorkbook(this.parseSheets);
  },
  methods: {
    parseSheets(wb) {
      this.$emit("update:sheets", [...wb.SheetNames]);
    }
  },
  render(h) {
    if (this.$slots.default) {
      return h("div", this.$slots.default);
    }
    return null;
  }
};
</script>
