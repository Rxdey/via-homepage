module.exports = {
  baseUrl: './',
  assetsDir: 'static',
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    modules: false,
    extract: false,
    sourceMap: false,
    loaderOptions: {
      less: {
        modifyVars: {
          '@green': '#57be6a'
        }
      }
    }
  }
};
