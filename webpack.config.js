const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const mode = process.env.mode || 'production'

const config = {
  gzip: false, //是否启动gzip压缩
  analyzer: false, //是否用树形图显示webpack输出文件的大小
  cssExtract: true, //是否提取css
  Global_CSS: [resolve('src/stylus/index.styl')] //全局预处理器样式路径
}

const webpackConfig = {
  //环境
  mode: mode,
  //编译错误和改动才提示
  stats: 'minimal',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    // publicPath: 'https://baidu.com',//覆盖path路径使用CDN
    path: resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    //引入文件可以不指定的扩展名
    extensions: ['.js', '.vue', '.css', '.scss'],
    //路径别名
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/,
        loader: [config.cssExtract ? MiniCssExtractPlugin.loader :
          'vue-style-loader', 'css-loader', 'postcss-loader', 'stylus-loader', {
          loader: 'style-resources-loader',
          options: {
            patterns: config.Global_CSS
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240, //10k以下的文件全部转行成Base64格式
          name: path.join('static', 'img', '[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240, //10k以下的文件全部转行成Base64格式
          name: path.join('static', 'media', '[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240, //10k以下的文件全部转行成Base64格式
          name: path.join('static', 'fonts', '[name].[hash:8].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({template: 'index.html'}),//自动帮你生成一个 html 文件，并且引用相关的js文件
    new CopyWebpackPlugin([{from: resolve('static'), to: resolve('dist/static'), ignore: ['.*']}])
  ],
  //优化选项
  optimization: {
    //是否压缩js代码,默认调用压缩插件,覆盖mode配置
    minimize: mode === 'production'
  }
}

//抽离css样式
config.cssExtract ? webpackConfig.plugins.push(new MiniCssExtractPlugin()) : null
//是否压缩成gzip
config.gzip ? webpackConfig.plugins.push(new CompressionWebpackPlugin({threshold: 10240})) : null
//webpack-dev-server配置
webpackConfig.devServer = {
  //编译错误和改动才提示
  stats: 'minimal',
  //gzip压缩
  compress: true,
  //自动打开网页
  open: true,
  //端口
  port: 9999
}

//相对路径转绝对路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = webpackConfig
