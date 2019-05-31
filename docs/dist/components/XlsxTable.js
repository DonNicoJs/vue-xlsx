var SheetTo = {
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

//

var script = {
  mixins: [SheetTo],
  data() {
    return {
      table: null
    };
  },
  mounted() {
    this._callBack = this.updateTable;
    this.load();
  },
  methods: {
    async load() {
      const {
        utils: { sheet_to_html }
      } = await import('xlsx');
      this._sheet_to_html = sheet_to_html;
      this.loaded = true;
    },
    updateTable(workbook) {
      const ws = workbook.Sheets[this.sheetNameFinder(workbook)];
      this.table = this._sheet_to_html(ws, this.options);
    }
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.table)?_c('div',{domProps:{"innerHTML":_vm._s(_vm.table)}}):_vm._e()};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var XlsxTable = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default XlsxTable;
