const presets = [
  '@babel/preset-env'
]

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-transform-runtime', {helpers: false}]
]

module.exports = {presets, plugins}
