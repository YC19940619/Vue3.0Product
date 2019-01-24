const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  baseUrl: './', //  Type:'string' Default: '/' 部署路径 ./
  outputDir: 'dist', //  Type: string Default: 'dist' 当使用生产环境构建时 目标目录将被清除
  assetsDir: 'static', //  Type: string Default: '' 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: 'index.html', //  Type: string Default:'index.html' 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  },
  devServer: {
    compress: true,
    disableHostCheck: true
  }
  // productionSourceMap: false // 打包时不生成.map文件
}
