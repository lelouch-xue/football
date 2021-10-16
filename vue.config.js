const path = require('path')

const Version = new Date().getTime()
const { js_ver, css_ver, img_ver } = {
  js_ver: `2020${Version}`,
  css_ver: `2020${Version}`,
  img_ver: `2020${Version}`
}

module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  // webpack相关配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', path.resolve(__dirname, './src'))
  },
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `./script/[name].${js_ver}.js`,
      chunkFilename: `./script/[name].${js_ver}.js`
    },
    optimization: {
      minimizer: [
        // new UglifyJsPlugin({
        //   uglifyOptions: {
        //     compress: {
        //       // warnings: false,
        //       drop_console: true, // console
        //       drop_debugger: false,
        //       pure_funcs: [ "console.log" ] // 移除console
        //     }
        //   }
        // })
      ],
      splitChunks: {
        cacheGroups: {
          charts: {
            chunks: 'async',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            name: 'charts'
          },
          vendors: {
            chunks: 'async',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            name: 'vendors'
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  // css相关配置
  css: {
    // 是否分离css（插件ExtractTextPlugin）
    extract: true,
    // 是否开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 是否启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // 是否使用 thread-loader
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    // host: 'lcp.autohome.com.cn',
    port: 8080,
    https: false,
    hotOnly: false,
    // http 代理配置
    // proxy: {
    //   '/api': {
    //     // target: 'http://47.111.65.173:8080',
    //     // target: 'http://localhost:8080',
    //     // target: 'https://123.56.2.234/c5_201706/activitiesApi.php',
    //     target: 'https://123.56.2.234/c5_201706/activitiesApi.php',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    before: (app) => {
    }
  },
  // 第三方插件配置
  pluginOptions: {}
}
