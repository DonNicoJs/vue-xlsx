export default {
  data() {
    return {
      libLoaded: false
    };
  },
  provide() {
    return {
      getWorkbook: this.getWorkbook
    };
  },
  methods: {
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
      this._callbackQueue.push(cb);
      if (this._workbook) {
        cb(this._workbook);
      }
    }
  }
};
