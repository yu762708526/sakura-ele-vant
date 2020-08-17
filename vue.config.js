const path = require('path')// 引入path模块
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
function resolve (dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: './', // 打包后的位置(如果不设置这个静态资源会报404)
  // publicPath: process.env.NODE_ENV === 'production' ? 'http://47.92.237.225:8080/dist' : './',
  outputDir: 'dist', // 打包后的目录名称
  assetsDir: 'static', // 静态资源目录名称
  productionSourceMap: false, // 去掉打包的时候生成的map文件
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('styles', resolve('src/common/styles'))
    // set第一个参数：设置的别名，第二个参数：设置的路径
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080, // 配置端口
    open: true, // 自动开启浏览器
    compress: true, // 开启压缩
    // 设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': { // 匹配所有以'/api'开头的请求路径
        target: 'http://121.41.229.155:4000', // 代理的目标基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径：去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      // 编译时删除console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      //  配置productionGzip-高级的方式
      // 配置参数详解
      // asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
      // algorithm： 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
      // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
      // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
      // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    } else {
      // 开发环境
    }
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  }
}
