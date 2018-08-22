const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  // 环境
  mode: process.env.mode,
  entry: {
    main: resolve('src', 'main.js')
    // main: ['babel-polyfill', resolve('src', 'main.js')]//IE
  },
  output: {
    // publicPath: '',
    path: resolve('dist'),
    filename: join('js', '[name].[chunkhash].js')
  },
  resolve: {
    // 引入文件可以不指定的扩展名
    extensions: ['.js', '.vue', '.css', '.scss'],
    // 路径别名
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 小于limit字节转为base64，大于则进行copy
          name: join('img', '[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 小于limit字节转为base64，大于则进行copy
          name: join('media', '[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 小于limit字节转为base64，大于则进行copy
          name: join('fonts', '[name].[hash:8].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,//删除注释
        collapseWhitespace: true,//删除空格
        removeAttributeQuotes: true//尽可能删除属性周围的引号
      }
    }),// 引用js\css到模板文件
    new CompressionWebpackPlugin({threshold: 1024}),// 文件大于1K则压缩成gzip
    new MiniCssExtractPlugin({filename: join('css', '[name].[contenthash].css')}),// 抽离css样式
    new CopyWebpackPlugin([{from: resolve('static'), to: 'static', ignore: ['.*']}])
  ],
  // 编译错误和改动才提示
  stats: 'minimal',
  optimization: {
    // 是否压缩js代码
    // minimize: true,
    //拆分模块
    splitChunks: {
      chunks: 'all',
      name: 'commons'
    }
  },
  // webpack-dev-server配置
  devServer: {
    // 绑定主机,局域网能访问
    // host: '0.0.0.0',
    //编译错误和改动才提示
    stats: 'minimal',
    // 自动打开网页
    open: true,
    // 端口
    port: 9999
  }
}

function resolve(...dir) {
  return path.posix.join(__dirname, ...dir)
}

function join(...dir) {
  return path.posix.join('static', ...dir)
}
