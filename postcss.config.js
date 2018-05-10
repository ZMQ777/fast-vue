module.exports = {
  plugins: {
    autoprefixer: {
      browsers: []
    },
    cssnano: {
      //避免cssnano重新计算z-index
      safe: true
    }
  }
}
