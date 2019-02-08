import vue from 'rollup-plugin-vue';
import replace from 'rollup-plugin-replace';
import node from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';


export default [
  {
    input: './src/index.js',
    external: ['vue'],
    output: {
      format: 'esm',
      file: `dist/vue-xlsx.es.js`
    },
    plugins: [
      cjs(),
      vue({
        css: true,
        compileTemplate: true
      }),
      buble({
        objectAssign: true
      })
    ]
  },
  {
    input: 'src/index.js',
    external: ['vue'],
    output: [{
      format: 'cjs',
      file: 'dist/vue-xlsx.cjs.js'
    }],
    plugins: [
      replace({ 'process.env.NODE_ENV': 'production' }),
      node({
        extensions: ['.vue', '.js']
      }),
      cjs(),
      vue({
        css: true,
        compileTemplate: true
      }),
      buble({
        objectAssign: true
      })
    ]
  },
  {
    input: 'src/index.js',
    external: ['vue'],
    output: {
      format: 'umd',
      name: 'vue-xlsx',
      file: 'dist/vue-xlsx.umd.min.js',
      globals: {
        vue: 'Vue',
      }
    },
    plugins: [
      replace({ 'process.env.NODE_ENV': 'production' }),
      node({
        extensions: ['.vue', '.js']
      }),
      cjs(),
      vue({
        css: true,
        compileTemplate: true
      }),
      buble({
        objectAssign: true
      })
    ]
  }
];
