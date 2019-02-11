<template>
  <div v-if="libLoaded">
    <slot />
  </div>
</template>

<script>
import WorkbookHandler from "@/mixins/WorkbookHandler";
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
  mixins: [WorkbookHandler],
  props: {
    sheetName: {
      type: String,
      default: "Sheet1"
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
  methods: {
    async load() {
      const {
        utils: { aoa_to_sheet, json_to_sheet, book_new, book_append_sheet }
      } = await import("xlsx");
      this._aoa_to_sheet = aoa_to_sheet;
      this._json_to_sheet = json_to_sheet;
      this._book_new = book_new;
      this._book_append_sheet = book_append_sheet;
      this.libLoaded = true;
      this._callbackQueue = [];
    },
    parseCollection(collection) {
      this._workbook = this._book_new();
      const type = typeFinder(collection[0]);
      const lib = {
        array: this._aoa_to_sheet,
        object: this._json_to_sheet
      };
      const ws = lib[type](collection, this.options);
      this._book_append_sheet(this._workbook, ws, this.sheetName);
      this.fireCallBacks();
      this.$emit("parsed", this._workbook);
    }
  }
};
</script>

<style></style>
