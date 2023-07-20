const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/examples', { 
      target: 'https://echarts.apache.org/examples',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  )
}
