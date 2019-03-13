const path = require('path');

module.exports = {
  title: 'Vue-XLSX',
  description: 'XLSX made friendly by Vue',
  themeConfig: {
    repo: 'DonNicoJs/vue-xlsx',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
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
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-136143492-1'
      }
    ]
  ]
};
