export default {
  inject: ["getWorkbook"],
  props: {
    sheet: {
      type: [String, Number],
      default: 0
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
  computed: {
    loadedAndSheet() {
      return this.loaded ? this.sheet : null;
    }
  },
  watch: {
    loadedAndSheet: {
      immediate: true,
      handler(sheet) {
        if (sheet !== null) {
          this.getWorkbook(this._callBack);
        }
      }
    }
  },
  mounted() {
    this._callBack = () => {
      console.warning("Missing data parsing callback");
    };
  },
  methods: {
    sheetNameFinder(workbook) {
      return Number.isInteger(this.sheet)
        ? workbook.SheetNames[this.sheet]
        : this.sheet;
    }
  }
};
