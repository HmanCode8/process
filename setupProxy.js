const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/examples', { 
      target: 'https://echarts.apache.org/examples',
      changeOrigin: true,
    })
  )
  app.use(
    proxy('/api/qq', { 
      target: 'https://api.vvhan.com',
      changeOrigin: true,
    })
  );
}
