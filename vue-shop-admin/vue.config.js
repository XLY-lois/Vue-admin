module.exports = {
  runtimeCompiler: true,
  publicPath: '/', // 设置打包文件相对路径
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8080,//前端端口
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://7.21.144.44/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
   },
}
// 47.98.218.58/
// 7.21.144.44
