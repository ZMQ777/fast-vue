const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  //环境
  mode: process.env.mode,
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    //publicPath: 'https://baidu.com',//覆盖path路径使用CDN
    path: resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    //引入文件可以不指定的扩展名
    extensions: ['.js', '.vue', '.css', '.scss'],
    //路径别名
    alias: {
      '@': resolve('src'),
      '~': resolve('src', 'pages'),
      '$': resolve('src', 'components')
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
        test: /\.s?css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
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
    new MiniCssExtractPlugin(),//抽离css样式
    new CompressionWebpackPlugin({threshold: 1024}),//文件大于1K则压缩成gzip
    new HtmlWebpackPlugin({template: 'index.html'}),//生成一个新的 index.html 文件，并且引用相关的js文件
    new CopyWebpackPlugin([{from: resolve('static'), to: resolve('dist', 'static'), ignore: ['.*']}])
  ],
  //编译错误和改动才提示
  stats: 'minimal',
  optimization: {
    //是否压缩js代码
    minimize: true
  },
  //webpack-dev-server配置
  devServer: {
    //绑定主机,局域网能访问
    // host: '0.0.0.0',
    //编译错误和改动才提示
    stats: 'minimal',
    //自动打开网页
    open: true,
    //端口
    port: 9999
  }
}

//相对路径转绝对路径
function resolve(...dir) {
  return path.join(__dirname, ...dir)
}
