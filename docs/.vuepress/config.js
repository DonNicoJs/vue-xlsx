const path = require('path');

module.exports = {
  title: 'Vue-XLSX',
  base: 'vue-xlsx',
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
  }
};
