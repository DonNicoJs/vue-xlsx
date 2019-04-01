import vue from "rollup-plugin-vue";
import replace from "rollup-plugin-replace";
import node from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import copy from "rollup-copy-plugin";

import fs from "fs";

const baseFolder = "./src/";
const componentFolder = "components/";
const mixinFolder = "mixins/";

const components = fs.readdirSync(baseFolder + componentFolder);
const mixins = fs.readdirSync(baseFolder + mixinFolder);

const mapEntry = (f, ext, folder) => ({
  input: baseFolder + folder + f,
  external: ["vue", "xlsx"],
  output: {
    format: "esm",
    file: `dist/${folder}${f.replace(ext, "js")}`
  },
  plugins: [
    replace({ "process.env.NODE_ENV": "production" }),
    node({
      extensions: [".vue", ".js"]
    }),
    cjs(),
    vue({
      css: true,
      compileTemplate: true
    })
  ]
});

export default [
  ...components.map(f => mapEntry(f, "vue", componentFolder)),
  ...mixins.map(f => mapEntry(f, "js", mixinFolder)),
  {
    input: "./src/utils.js",
    external: ["vue", "xlsx"],
    output: {
      format: "esm",
      file: `dist/utils.js`
    },
    plugins: [
      replace({ "process.env.NODE_ENV": "production" }),
      node({
        extensions: [".vue", ".js"]
      }),
      cjs(),
      copy({
        "src/index.js": "dist/vue-xlsx.es.js",
        "src/polyfills.js": "dist/polyfills.js"
      })
    ]
  },
  {
    input: "src/index.js",
    external: ["vue", "xlsx"],
    output: [
      {
        format: "cjs",
        file: "dist/vue-xlsx.cjs.js"
      }
    ],
    plugins: [
      replace({ "process.env.NODE_ENV": "production" }),
      node({
        extensions: [".vue", ".js"]
      }),
      cjs(),
      vue({
        css: true,
        compileTemplate: true
      }),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true
      })
    ]
  },
  {
    input: "src/index.js",
    external: ["vue", "xlsx"],
    output: {
      format: "umd",
      name: "vue-xlsx",
      file: "dist/vue-xlsx.umd.js",
      globals: {
        vue: "Vue"
      }
    },
    plugins: [
      replace({ "process.env.NODE_ENV": "production" }),
      node({
        extensions: [".vue", ".js"]
      }),
      cjs(),
      vue({
        css: true,
        compileTemplate: true
      }),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true
      })
    ]
  }
];
