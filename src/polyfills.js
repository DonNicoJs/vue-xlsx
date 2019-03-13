export const globalPolyfill = () => {
  var global = global || window;
  if (window) {
    window.global = global;
  }
};
