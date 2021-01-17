module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', [
      '@babel/preset-env', {
        modules: false
      }
    ]
  ],
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-plus',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
