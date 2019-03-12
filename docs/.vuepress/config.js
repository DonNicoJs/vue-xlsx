const path = require('path');

module.exports = {
  title: 'Vue-XLSX',
  description: 'XLSX made friendly by Vue',
  themeConfig: {
    sidebar: ['/', '/guide/', {
      title: 'Components',
      sidebarDepth: 1,
      children: [
        '/components/xlsx-to-js',
        '/components/js-to-xlsx'
      ]
    }],
    displayAllHeaders: true // Default: false
  },
  configureWebpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'vue-xlsx': path.resolve(__dirname, '../dist/vue-xlsx.es.js')
      }
    }
  }
};
