var WorkbookHandler = {
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

var script = {
  mixins: [WorkbookHandler],
  provide() {
    return {
      addSheet: this.addSheet,
      deleteSheet: this.deleteSheet
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const { globalPolyfill } = require("../polyfills");
      globalPolyfill();
      const {
        utils: { book_new, book_append_sheet }
      } = await import('xlsx');
      this._book_new = book_new;
      this._book_append_sheet = book_append_sheet;
      this._workbook = this._book_new();
      this.$emit("created", this._workbook);
      this.libLoaded = true;
    },
    addSheet(sheet, sheetName) {
      if (this._workbook) {
        this.deleteSheet(sheetName);
        this._book_append_sheet(this._workbook, sheet, sheetName);
        this.$emit("change", this._workbook);
      }
    },
    deleteSheet(sheetName) {
      if (this._workbook && this._workbook.Sheets[sheetName]) {
        this._workbook.SheetNames = this._workbook.SheetNames.filter(
          s => s !== sheetName
        );
        this._workbook.Sheets[sheetName] = undefined;
        this.$emit("change", this._workbook);
      }
    }
  },
  render(h) {
    if (this.$slots.default && this.libLoaded) {
      return h("div", this.$slots.default);
    }
    return null;
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var XlsxWorkbook = normalizeComponent_1(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default XlsxWorkbook;
