module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport-rxdey': {
      viewportWidth: 750,
      unitPrecision: 3,
      viewportUnit: 'rem',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      multiple: 10,
      exclude: ['vue-loading-rx'],
      rules: {
        path: ['swiper', 'rxui'],
        fn: (pixels, vw) => `${2 * vw}rem`
      }
    }
  }
};
