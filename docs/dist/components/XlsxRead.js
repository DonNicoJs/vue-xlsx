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
  props: {
    file: {
      type: null,
      default: null
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    loadedAndFile() {
      return this.libLoaded ? this.file : null;
    }
  },
  watch: {
    loadedAndFile: {
      immediate: true,
      handler(file) {
        if (file) {
          this.parseFile(file);
        }
      }
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const { globalPolyfill } = require("../polyfills");
      globalPolyfill();
      const { read } = await import('xlsx');
      this._read = read;
      this.libLoaded = true;
      this._callbackQueue = [];
    },
    parseFile(file) {
      this.startLoading();
      const reader = new FileReader();
      reader.onload = e => {
        let binary = "";
        const bytes = new Uint8Array(e.target.result);
        const length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        this._workbook = this._read(binary, {
          type: "binary",
          ...this.options
        });
        this.fireCallBacks();
        this.$emit("parsed", this._workbook);
        this.endLoading();
      };
      reader.onerror = e => {
        console.log(e);
      };
      reader.readAsArrayBuffer(file);
    }
  },
  render(h) {
    if (this.$scopedSlots.default && this.libLoaded) {
      return h("div", [
        this.$scopedSlots.default({
          loading: this.loading
        })
      ]);
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
  

  
  var XlsxRead = normalizeComponent_1(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default XlsxRead;
