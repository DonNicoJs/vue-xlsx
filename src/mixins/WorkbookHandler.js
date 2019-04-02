export default {
  data() {
    return {
      libLoaded: false,
      loading: false
    };
  },
  provide() {
    return {
      getWorkbook: this.getWorkbook
    };
  },
  methods: {
    startLoading() {
      this.loading = true;
      this.$emit("loading", this.loading);
    },
    endLoading() {
      this.loading = false;
      this.$emit("loading", this.loading);
    },
    fireCallBacks() {
      if (this._callbackQueue && Array.isArray(this._callbackQueue)) {
        this._callbackQueue.forEach(cb => {
          try {
            cb(this._workbook);
          } catch (e) {
            console.warning("error in firing callbacks", e);
          }
        });
      }
    },
    getWorkbook(cb) {
      if (this._callbackQueue) {
        this._callbackQueue.push(cb);
      }
      if (this._workbook) {
        cb(this._workbook);
      }
    }
  }
};
