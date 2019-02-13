<template>
  <div v-if="libLoaded">
    <slot />
  </div>
</template>

<script>
const typeFinder = value =>
  Array.isArray(value) ? "array" : value instanceof Object ? "object" : false;

const collectionValidator = collection => {
  return collection.reduce((a, c) => {
    if (a === null) {
      return typeFinder(c);
    } else {
      return typeFinder(c) === a ? a : false;
    }
  }, null);
};

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
    loadedAndCollection() {
      return this.libLoaded ? this.collection : null;
    }
  },
  watch: {
    loadedAndCollection: {
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
    this.deleteSheet();
  },
  methods: {
    async load() {
      const {
        utils: { aoa_to_sheet, json_to_sheet, book_append_sheet }
      } = await import("xlsx");
      this._aoa_to_sheet = aoa_to_sheet;
      this._json_to_sheet = json_to_sheet;
      this._book_append_sheet = book_append_sheet;
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
      this.$emit("sheet:parsed", this._sheet);
      this.addSheet(this._sheet, this.sheetName);
    }
  }
};
</script>

<style></style>
