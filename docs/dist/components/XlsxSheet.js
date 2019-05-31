const typeFinder = value =>
  value instanceof Array ? "array" : value instanceof Object ? "object" : false;

const collectionValidator = collection => {
  return collection.reduce((a, c) => {
    if (a === null) {
      return typeFinder(c);
    } else {
      return typeFinder(c) === a ? a : false;
    }
  }, null);
};

var script = {
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
    readyToParse() {
      return this.libLoaded ? this.collection : null;
    }
  },
  watch: {
    readyToParse: {
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
    this.deleteSheet(this.sheetName);
  },
  methods: {
    async load() {
      const {
        utils: { aoa_to_sheet, json_to_sheet }
      } = await import('xlsx');
      this._aoa_to_sheet = aoa_to_sheet;
      this._json_to_sheet = json_to_sheet;
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
      this.$emit("parsed", this._sheet);
      this.addSheet(this._sheet, this.sheetName);
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
  

  
  var XlsxSheet = normalizeComponent_1(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default XlsxSheet;
